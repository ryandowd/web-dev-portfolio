import { MongoClient } from 'mongodb';
import { MONGODB_PORTFOLIO_URL, MONGODB_FINANCE_URL } from '@/constants';

export async function connectToDatabase(dbType) {
  let dbTypeUrl;

  console.log('dbType', dbType);

  switch (dbType) {
    case 'portfolio':
      dbTypeUrl = MONGODB_PORTFOLIO_URL;
      break;
    case 'finance':
      dbTypeUrl = MONGODB_FINANCE_URL;
      break;
  }

  console.log('dbType', dbTypeUrl);
  const client = await MongoClient.connect(dbTypeUrl);
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllEvents(client) {
  const db = client.db();
  const collection = await db.collection('events');
  const documents = await collection.find().toArray();
  client.close();
  return documents;
}

export async function getEvent(eventId, client) {
  const db = client.db();
  const collection = await db.collection('events');
  const document = await collection.findOne({ eventId });
  client.close();
  return document;
}
