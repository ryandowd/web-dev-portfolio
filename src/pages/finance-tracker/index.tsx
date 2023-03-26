import Head from 'next/head';
import { FinanceDashboardPage } from '@/components/finance/FinanceDashboardPage';
import { connectToDatabase, getAllDocuments } from '@/utils/db-util';
import { findGBPTotal, getAllTotals } from '@/global/utils';
import { SnapshotWithTotals } from '@/components/finance/global/types';

type FinancePageProps = {
  snapshotsWithTotals: SnapshotWithTotals[];
};

export default function FinancePage(props: FinancePageProps) {
  const { snapshotsWithTotals } = props;
  return (
    <>
      <Head>
        <title>Finance App</title>
        <meta name='description' content='Finance app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <FinanceDashboardPage snapshotsWithTotals={snapshotsWithTotals} />
    </>
  );
}

export async function getStaticProps() {
  const client = await connectToDatabase('finance');
  const allSnapshots = await getAllDocuments(client, 'snapshots');

  const snapshots = allSnapshots.map((snapshot: any) => {
    const updatedSnapshot = {
      ...snapshot,
    };

    delete updatedSnapshot._id;
    return updatedSnapshot;
  });

  snapshots.sort((a: any, b: any) => {
    return (
      new Date(b.snapshotDate).getTime() - new Date(a.snapshotDate).getTime()
    );
  });

  const snapshotsWithTotals = snapshots.map((snapshot: SnapshotWithTotals) => {
    const snapshotWithTotalAssets = getAllTotals(snapshot);
    return {
      ...snapshotWithTotalAssets,
      total: findGBPTotal(snapshotWithTotalAssets.snapshotTotals),
    };
  });

  client.close();

  return {
    props: {
      snapshotsWithTotals,
    },
    revalidate: 10,
  };
}
