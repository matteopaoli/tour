import { MongoClient, Db } from 'mongodb'

const uri = process.env.MONGODB_URI

let cachedDb: Db | null = null

export async function connectToDatabase(): Promise<Db> {
  if (cachedDb) {
    return cachedDb
  }

  const client = await MongoClient.connect(uri!, {
    maxPoolSize: 10
  })

  const db = client.db('main')

  cachedDb = db
  return db
}
