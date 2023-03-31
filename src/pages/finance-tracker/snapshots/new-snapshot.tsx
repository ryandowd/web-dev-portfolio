import { AddSnapshotPage } from '@/sites/finance/components/AddSnapshotPage';
import { Snapshot } from '@/sites/finance/global/types';
import { connectToDatabase, getAllDocuments } from '@/utils/db-util';

type AddSnapshotProps = {
  previousSnapshot: Snapshot | null;
};

export default function AddSnapshot(props: AddSnapshotProps) {
  const { previousSnapshot } = props;
  return <AddSnapshotPage previousSnapshot={previousSnapshot} />;
}

export async function getStaticProps() {
  const client = await connectToDatabase('finance');
  const snapshots = await getAllDocuments(client, 'snapshots');

  snapshots
    .sort((a: any, b: any) => {
      return (
        new Date(b.snapshotDate).getTime() - new Date(a.snapshotDate).getTime()
      );
    })
    .reverse();

  const previousSnapshot = snapshots[0];

  if (previousSnapshot) {
    // @ts-ignore
    delete previousSnapshot._id;
  }

  return {
    props: {
      previousSnapshot: previousSnapshot || null,
    },
  };
}
