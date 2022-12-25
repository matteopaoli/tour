import { MongoClient, Db } from 'mongodb';

let db: Db;

export async function connect(): Promise<Db> {
  if (db) return db;

  const dbUri = process.env.MONGODB_URI
  if (dbUri) {
    const client = new MongoClient(dbUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db('main');
    return db;
  }
}

export function getDb(): Db {
  return db;
}