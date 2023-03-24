import { EventUpdatePage } from '@/components/portfolio/EventUpdatePage';
import { EventProps } from '@/types';
import {
  connectToDatabase,
  getAllDocuments,
  getDocument,
} from '@/utils/db-util';
import type { GetStaticPropsContext } from 'next';
import { Snapshot } from '@/components/finance/global/types';
import { SnapshotDetailPage } from '@/components/finance/SnapshotDetailPage';
import { getAllTotals } from '../utils';

type SnapshotPageProps = {
  snapshot: Snapshot;
};

export default function SnapshotPage(props: SnapshotPageProps) {
  const { snapshot } = props;

  console.log('snapshot MARCH', snapshot);

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

  const snapshotWithTotals = getAllTotals(snapshot);

  return {
    props: {
      snapshot: snapshotWithTotals,
    },
  };
}

export async function getStaticPaths() {
  const client = await connectToDatabase('finance');
  const snapshots = await getAllDocuments(client, 'snapshots');

  const paths = snapshots.map((snapshot) => ({
    params: { snapshotId: snapshot.snapshotId },
  }));

  return {
    paths: paths,
    fallback: 'blocking',
  };
}
