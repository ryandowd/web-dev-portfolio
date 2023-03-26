import { AddSnapshotPage } from '@/components/finance/AddSnapshotPage';
import { SnapshotWithTotals } from '@/components/finance/global/types';
import { connectToDatabase, getAllDocuments } from '@/utils/db-util';

type AddSnapshotProps = {
  previousSnapshot: SnapshotWithTotals | null;
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
    delete previousSnapshot._id;
  }

  return {
    props: {
      previousSnapshot: previousSnapshot || null,
    },
  };
}
