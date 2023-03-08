import { MongoClient } from 'mongodb';
import { MONGODB_URL } from '@/constants';

export async function connectToDatabase() {
  const client = await MongoClient.connect(MONGODB_URL);
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}
