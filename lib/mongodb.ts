import { Db, MongoClient } from 'mongodb'

let db: Db | null = null

export const connect = async (): Promise<Db | undefined> => {
  if (db) return db

  const dbUri = process.env.MONGODB_URI
  if (dbUri) {
    const client = new MongoClient(dbUri)
    await client.connect()
    db = client.db('main')
    return db
  }
  
  return undefined
}

export function getDb(): Db {
  if (db) {
    return db
  }
  else throw new Error('No db connection')
}