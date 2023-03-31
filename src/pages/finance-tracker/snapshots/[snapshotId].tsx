import { connectToDatabase, getAllDocuments } from '@/utils/db-util';
import type { GetStaticPropsContext } from 'next';
import { Snapshot } from '@/sites/finance/global/types';
import { SnapshotDetailPage } from '@/sites/finance/components/SnapshotDetailPage';
import {
  appendMonthTotalDifference,
  appendSnapshotTotal,
  getTotalAssetTypeDifferences,
  getAssetDifferences,
  deleteMongoId,
  getAssetsTotals,
  orderSnapshotsByDate,
} from '@/sites/finance/global/server-utils';

type SnapshotPageProps = {
  snapshot: Snapshot;
};

export default function SnapshotPage(props: SnapshotPageProps) {
  const { snapshot } = props;

  return <SnapshotDetailPage snapshot={snapshot} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const snapshotId = context.params?.snapshotId;

  const client = await connectToDatabase('finance');
  const snapshots = await getAllDocuments(client, 'snapshots');
  // @ts-ignore
  const orderedSnapshots = orderSnapshotsByDate(snapshots);

  client.close();

  // @ts-ignore
  const currSnapshotIndex = snapshots.findIndex((currSnapshot: Snapshot) => {
    return currSnapshot.snapshotId === snapshotId;
  });

  const currSnapshot = orderedSnapshots[currSnapshotIndex];
  const currDeleteMongoId = deleteMongoId(currSnapshot);
  const currSnapshotWithAssetTotals = getAssetsTotals(currDeleteMongoId);
  const currSnapshotWithTotal = appendSnapshotTotal(
    currSnapshotWithAssetTotals
  );

  const prevSnapshot = orderedSnapshots[currSnapshotIndex + 1];
  const prevSnapshotWithAssetTotals = getAssetsTotals(prevSnapshot);
  const prevSnapshotTotal = appendSnapshotTotal(prevSnapshotWithAssetTotals);

  const currSnapshotWithMonthTotalDifference = appendMonthTotalDifference(
    currSnapshotWithTotal,
    prevSnapshotTotal.total
  );

  const snapshotTotalsWithDifferences = getTotalAssetTypeDifferences(
    currSnapshotWithMonthTotalDifference,
    prevSnapshotWithAssetTotals
  );

  const snapshotAssetsWithDifferences = getAssetDifferences(
    currSnapshotWithMonthTotalDifference,
    prevSnapshot
  );

  const altFinalSnapshot = {
    ...currSnapshotWithMonthTotalDifference,
    snapshotTotals: snapshotTotalsWithDifferences,
    snapshotAssets: snapshotAssetsWithDifferences,
  };

  return {
    props: {
      snapshot: altFinalSnapshot,
    },
  };
}

export async function getStaticPaths() {
  const client = await connectToDatabase('finance');
  const snapshots = await getAllDocuments(client, 'snapshots');

  client.close();

  // @ts-ignore
  const paths = snapshots.map((snapshot: Snapshot) => ({
    params: { snapshotId: snapshot.snapshotId },
  }));

  return {
    paths: paths,
    fallback: 'blocking',
  };
}
