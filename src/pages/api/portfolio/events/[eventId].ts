import { connectToDatabase, getDocument } from '@/utils/db-util';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const eventId = req.body.eventId;
    const client = await connectToDatabase('portfolio');
    const db = client.db();

    const result = await db.collection('events').deleteOne({ eventId });

    res.status(200).json({ message: 'Successfully deleted event', result });
  }

  if (req.method === 'PUT') {
    const updatedEvent = req.body.updatedEvent;
    const eventId = req.body.updatedEvent.eventId;
    const client = await connectToDatabase('portfolio');
    const db = client.db();

    const result = await db
      .collection('events')
      .updateOne({ eventId }, { $set: { ...updatedEvent } });

    res.status(200).json({ message: 'Successfully updated event', result });
  }

  if (req.method === 'GET') {
    const client = await connectToDatabase('portfolio');
    const eventId = req.query.eventId;
    const event = await getDocument('eventId', eventId, client, 'events');
    delete event._id;

    if (!event) {
      res.status(404).json({ message: 'Could not find event' });
    }

    res.status(200).json({ event });
  }
}
