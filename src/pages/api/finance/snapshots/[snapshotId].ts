import { transformSnapshots } from '@/sites/finance/global/server-utils';
import { connectToDatabase, getAllDocuments } from '@/utils/db-util';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const snapshotId = req.body.snapshotId;
    const client = await connectToDatabase('finance');
    const db = client.db();

    const result = await db.collection('snapshots').deleteOne({ snapshotId });

    res.status(200).json({ message: 'Successfully deleted snapshot', result });
  }

  if (req.method === 'PUT') {
    const updatedSnapshot = req.body.updatedSnapshot;
    const snapshotId = req.body.updatedSnapshot.snapshotId;
    const client = await connectToDatabase('finance');
    const db = client.db();

    const trimmedSnapshot = {
      snapshotAssets: updatedSnapshot.snapshotAssets,
      snapshotDate: updatedSnapshot.snapshotDate,
      snapshotId: updatedSnapshot.snapshotId,
    };

    const result = await db
      .collection('snapshots')
      .updateOne({ snapshotId }, { $set: { ...trimmedSnapshot } });

    res.status(200).json({ message: 'Successfully updated event', result });
  }

  if (req.method === 'GET') {
    const client = await connectToDatabase('finance');
    const snapshotId = req.query.snapshotId;
    const allSnapshots = await getAllDocuments(client, 'snapshots');
    // @ts-ignore
    const transformedSnapshots = transformSnapshots(allSnapshots);
    const snapshot = transformedSnapshots.find(
      (transformedSnapshot) => transformedSnapshot.snapshotId === snapshotId
    );

    client.close();

    if (snapshot) {
      res.status(200).json({ snapshot });
    } else {
      res.status(404).json({ message: 'Could not find snapshot' });
    }
  }
}
