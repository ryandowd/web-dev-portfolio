import { connectToDatabase, getAllDocuments } from '@/utils/db-util';
import type { GetStaticPropsContext } from 'next';
import { Snapshot } from '@/sites/finance/global/types';
import { SnapshotDetailPage } from '@/sites/finance/components/SnapshotDetailPage';
import { transformSnapshots } from '@/sites/finance/global/server-utils';

type SnapshotPageProps = {
  snapshot: Snapshot;
};

export default function SnapshotPage(props: SnapshotPageProps) {
  const { snapshot } = props;

  console.log('snapshot', JSON.stringify(snapshot, null, 2));

  return <SnapshotDetailPage snapshot={snapshot} />;
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const snapshotId = context.params?.snapshotId;

  const client = await connectToDatabase('finance');
  const allSnapshots = await getAllDocuments(client, 'snapshots');
  // @ts-ignore
  const transformedSnapshots = transformSnapshots(allSnapshots);
  const snapshot = transformedSnapshots.find(
    (transformedSnapshot) => transformedSnapshot.snapshotId === snapshotId
  );

  client.close();

  return {
    props: {
      snapshot,
    },
    revalidate: 5,
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
