import {
  connectToDatabase,
  getAllDocuments,
  getDocument,
} from '@/utils/db-util';
import type { GetStaticPropsContext } from 'next';
import { SnapshotWithTotals } from '@/components/finance/global/types';
import { SnapshotDetailPage } from '@/components/finance/SnapshotDetailPage';
import { findGBPTotal, getAllTotals } from '@/global/utils';

type SnapshotPageProps = {
  snapshot: SnapshotWithTotals;
};

export default function SnapshotPage(props: SnapshotPageProps) {
  const { snapshot } = props;

  return <SnapshotDetailPage snapshot={snapshot} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const snapshotId = context.params?.snapshotId;
  const client = await connectToDatabase('finance');
  const snapshot = await getDocument(
    'snapshotId',
    snapshotId,
    client,
    'snapshots'
  );

  client.close();

  const snapshotWithTotalAssets = getAllTotals(snapshot);

  const snapshotWithTotals = {
    ...snapshotWithTotalAssets,
    total: findGBPTotal(snapshotWithTotalAssets.snapshotTotals),
  };

  return {
    props: {
      snapshot: snapshotWithTotals,
    },
  };
}

export async function getStaticPaths() {
  const client = await connectToDatabase('finance');
  const snapshots = await getAllDocuments(client, 'snapshots');

  client.close();

  const paths = snapshots.map((snapshot: SnapshotWithTotals) => ({
    params: { snapshotId: snapshot.snapshotId },
  }));

  return {
    paths: paths,
    fallback: 'blocking',
  };
}
