import { connectToDatabase } from '@/utils/db-util';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const AddSnapshot = req.body.AddSnapshot;
    const client = await connectToDatabase('finance');
    const db = client.db();

    await db.collection('snapshots').insertOne({ ...AddSnapshot });

    client.close();

    res.status(201).json({
      message: 'Successfully updated',
      AddSnapshot,
    });
  }

  // if (req.method === 'GET') {
  //   const client = await connectToDatabase('portfolio');
  //   const db = client.db();
  //   const result = await db
  //     .collection('events')
  //     .find()
  //     .sort({ _id: -1 })
  //     .toArray();

  //   const snapshotsList = result.map((snapshot: any) => {
  //     const updatedSnapshot = {
  //       ...snapshot,
  //       id: snapshot._id.toString(),
  //     };

  //     delete updatedSnapshot._id;

  //     return updatedSnapshot;
  //   });

  //   res.status(200).json({ events: snapshotsList });

  //   client.close();
  // }
}
