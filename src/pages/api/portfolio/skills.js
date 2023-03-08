import { connectToDatabase, insertOneDocument } from '@/lib/db-util';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const skillsList = req.body.skillsList;
    const client = await connectToDatabase();
    const db = client.db();

    const result = await db.collection('skills').updateOne(
      {},
      {
        $set: {
          skillsList,
        },
      }
    );

    // try {
    //   const result = await insertOneDocument(client, 'skills', { skill });
    //   res.status(201).json({ message: 'Skill added', skill });

    //   client.close();
    // } catch (error) {
    //   res.status(500).json({ message: 'Inserting comment has failed' });
    //   return;
    // }
    client.close();
    res.status(201).json({ message: 'Successfully updated', skillsList });
  }

  if (req.method === 'GET') {
    const client = await connectToDatabase();
    const db = client.db();
    const result = await db.collection('skills').find().toArray();
    res.status(200).json({ skillsList: result[0].skillsList });

    client.close();
  }
}
