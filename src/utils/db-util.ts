import { MongoClient } from 'mongodb';
import {
  MONGODB_PORTFOLIO_URL,
  MONGODB_FINANCE_URL,
} from '@/sites/main/constants';

export async function connectToDatabase(dbType) {
  let dbTypeUrl;

  switch (dbType) {
    case 'portfolio':
      dbTypeUrl = MONGODB_PORTFOLIO_URL;
      break;
    case 'finance':
      dbTypeUrl = MONGODB_FINANCE_URL;
      break;
  }

  const client = await MongoClient.connect(dbTypeUrl);
  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();
  const result = await db.collection(collection).insertOne(document);
  return result;
}

export async function getAllDocuments(client, collectionName) {
  const db = client.db();
  const collection = await db.collection(collectionName);
  const documents = await collection.find().toArray();
  return documents;
}

export async function getDocument(idKey, id, client, collectionName) {
  const db = client.db();
  const collection = await db.collection(collectionName);
  const document = await collection.findOne({ [idKey]: id });
  delete document._id;
  return document;
}
