import { connectToDatabase } from '@/lib/db-util';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const newEvent = req.body.newEvent;
    const client = await connectToDatabase();
    const db = client.db();

    const result = await db.collection('events').insertOne({ ...newEvent });

    client.close();

    res.status(201).json({
      message: 'Successfully updated',
      newEvent,
    });
  }

  if (req.method === 'GET') {
    const client = await connectToDatabase();
    const db = client.db();
    const result = await db
      .collection('events')
      .find()
      .sort({ _id: -1 })
      .toArray();

    const eventsList = result.map((event) => {
      const updatedEvent = {
        ...event,
        id: event._id.toString(),
        title: 'From GET',
      };

      delete updatedEvent._id;

      return updatedEvent;
    });

    res.status(200).json({ events: eventsList });

    client.close();
  }

  // if (req.method === 'PUT') {
  //   const updatedEvent = req.body.updatedEvent;
  //   console.log('PUT!!!', updatedEvent);
  //   console.log('updatedEvent.eventId', updatedEvent.eventId);

  //   const client = await connectToDatabase();
  //   const db = client.db();
  //   const result = await db
  //     .collection('events')
  //     .findOne({ eventId: updatedEvent.eventId });

  //   // console.log('singleEvent', singleEvent);
  // }
}
