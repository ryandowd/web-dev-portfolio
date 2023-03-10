import { connectToDatabase } from '@/lib/db-util';

export default async function handler(req, res) {
  if (req.method === 'DELETE') {
    const eventId = req.body.eventId;
    const client = await connectToDatabase();
    const db = client.db();

    const result = await db.collection('events').deleteOne({ eventId });

    res.status(200).json({ message: 'Successfully deleted event', result });
  }

  if (req.method === 'PUT') {
    const updatedEvent = req.body.updatedEvent;
    const eventId = req.body.updatedEvent.eventId;
    const client = await connectToDatabase();
    const db = client.db();

    const result = await db
      .collection('events')
      .updateOne({ eventId }, { $set: { ...updatedEvent } });

    res.status(200).json({ message: 'Successfully updated event', result });
  }
}
