import { connectToDatabase } from '@/utils/db-util';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const newEvent = req.body.newEvent;
    const client = await connectToDatabase('portfolio');
    const db = client.db();

    await db.collection('events').insertOne({ ...newEvent });

    client.close();

    res.status(201).json({
      message: 'Successfully updated',
      newEvent,
    });
  }

  if (req.method === 'GET') {
    const client = await connectToDatabase('portfolio');
    const db = client.db();
    const result = await db
      .collection('events')
      .find()
      .sort({ _id: -1 })
      .toArray();

    const eventsList = result.map((event: any) => {
      const updatedEvent = {
        ...event,
        id: event._id.toString(),
      };

      delete updatedEvent._id;

      return updatedEvent;
    });

    res.status(200).json({ events: eventsList });

    client.close();
  }
}
