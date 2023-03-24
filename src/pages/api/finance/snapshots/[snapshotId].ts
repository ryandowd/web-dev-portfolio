import { getAllTotals } from '@/pages/finance-tracker/utils';
import { connectToDatabase, getDocument } from '@/utils/db-util';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const snapshotId = req.body.snapshotId;
    const client = await connectToDatabase('finance');
    const db = client.db();

    const result = await db.collection('events').deleteOne({ snapshotId });

    res.status(200).json({ message: 'Successfully deleted snapshot', result });
  }

  if (req.method === 'PUT') {
    const updatedSnapshot = req.body.updatedSnapshot;
    const snapshotId = req.body.updatedSnapshot.snapshotId;
    const client = await connectToDatabase('finance');
    const db = client.db();

    const result = await db
      .collection('snapshots')
      .updateOne({ snapshotId }, { $set: { ...updatedSnapshot } });

    res.status(200).json({ message: 'Successfully updated event', result });
  }

  if (req.method === 'GET') {
    const client = await connectToDatabase('finance');
    const snapshotId = req.query.snapshotId;
    const snapshot = await getDocument(
      'snapshotId',
      snapshotId,
      client,
      'snapshots'
    );

    delete snapshot._id;

    if (!snapshot) {
      res.status(404).json({ message: 'Could not find snapshot' });
    }

    res.status(200).json({ snapshot });
  }
}
