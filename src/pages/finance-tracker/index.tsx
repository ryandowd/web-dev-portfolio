import Head from 'next/head';
import { FinanceDashboardPage } from '@/sites/finance/components/FinanceDashboardPage';
import { connectToDatabase, getAllDocuments } from '@/utils/db-util';
import { Snapshot } from '@/sites/finance/global/types';
import {
  appendMonthTotalDifferences,
  appendAllSnaphotTotals,
  deleteMongoIds,
  orderSnapshotsByDate,
  getTotalAssetTypeDifferences,
  getAssetsTotals,
  appendSnapshotTotal,
} from '@/sites/finance/global/server-utils';

type FinancePageProps = {
  snapshots: Snapshot[];
};

export default function FinancePage(props: FinancePageProps) {
  const { snapshots } = props;

  return (
    <>
      <Head>
        <title>Finance App</title>
        <meta name='description' content='Finance app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <FinanceDashboardPage snapshots={snapshots} />
    </>
  );
}

export async function getStaticProps() {
  const client = await connectToDatabase('finance');
  const allSnapshots = await getAllDocuments(client, 'snapshots');

  // @ts-ignore
  const deleteSnapshotIds = deleteMongoIds(allSnapshots);
  const orderedSnapshots = orderSnapshotsByDate(deleteSnapshotIds);
  const snapshotsWithTotals = appendAllSnaphotTotals(orderedSnapshots);

  const snapshotsWithTotalDifferences =
    appendMonthTotalDifferences(snapshotsWithTotals);

  const totalAssetTypeDifferences = snapshotsWithTotalDifferences.map(
    (currSnapshot, snapshotIndex) => {
      const prevSnapshot = snapshotsWithTotalDifferences[snapshotIndex + 1];

      const snapshotTotalsWithDifferences = getTotalAssetTypeDifferences(
        currSnapshot,
        prevSnapshot
      );

      return {
        ...currSnapshot,
        snapshotTotals: snapshotTotalsWithDifferences,
      };
    }
  );

  client.close();

  return {
    props: {
      snapshots: totalAssetTypeDifferences,
    },
    revalidate: 500,
  };
}
