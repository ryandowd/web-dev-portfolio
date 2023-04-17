import { transformSnapshots } from '@/sites/finance/global/server-utils';
import { connectToDatabase, getAllDocuments } from '@/utils/db-util';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const newSnapshot = req.body.newSnapshot;
    const client = await connectToDatabase('finance');
    const db = client.db();

    const trimmedSnapshot = {
      snapshotAssets: newSnapshot.snapshotAssets,
      snapshotDate: newSnapshot.snapshotDate,
      snapshotId: newSnapshot.snapshotId,
    };

    await db.collection('snapshots').insertOne({ ...trimmedSnapshot });

    client.close();

    res.status(201).json({
      message: 'Successfully updated',
      newSnapshot,
    });
  }

  if (req.method === 'GET') {
    const client = await connectToDatabase('finance');
    const allSnapshots = await getAllDocuments(client, 'snapshots');
    // @ts-ignore
    const transformedSnapshots = transformSnapshots(allSnapshots);

    client.close();

    if (transformedSnapshots) {
      res.status(200).json({ snapshots: transformedSnapshots });
    } else {
      res.status(404).json({ message: 'Could not find snapshot' });
    }
  }
}
