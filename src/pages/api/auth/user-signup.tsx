import { hashPassword } from '@/utils/auth-util';
import { connectToDatabase } from '@/utils/db-util';

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return;
  }

  const data = req.body;
  const { username, password } = data;

  if (!username || !password) {
    res.status(422).json({ message: 'invalid input' });
    return;
  }

  const client = await connectToDatabase();
  const db = client.db();

  const userAlreadyExists = await db.collection('users').findOne({ username });

  if (userAlreadyExists) {
    res.status(422).json({ message: 'This user already exists' });
    client.close();
    return;
  } else {
    const hashedPassword = await hashPassword(password);

    db.collection('users').insertOne({
      username,
      password: hashedPassword,
    });

    console.log('client', client);

    res.status(201).json({ message: 'Created user!', username, password });
    // client.close();
    return;
  }
}
