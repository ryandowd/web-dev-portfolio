import { AddSnapshotPage } from '@/components/finance/AddSnapshotPage';
import { connectToDatabase, getAllDocuments } from '@/utils/db-util';

export default function AddSnapshot(props) {
  const { previousSnapshot } = props;
  return <AddSnapshotPage previousSnapshot={previousSnapshot} />;
}

export async function getStaticProps() {
  const client = await connectToDatabase('finance');
  const snapshots = await getAllDocuments(client, 'snapshots');

  snapshots.sort((a: any, b: any) => {
    return (
      new Date(b.snapshotDate).getTime() - new Date(a.snapshotDate).getTime()
    );
  });

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
