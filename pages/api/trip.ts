import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/mongodb'
import { Trip } from '../../types'

export async function getTripById(id: string): Promise<Trip | null> {
  const collection = (await connectToDatabase()).collection<Trip>('trips')
  const trip = await collection.findOne({ _id: new ObjectId(id) })
  return trip
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.query.id) {
      // id was specified in the query string
      const trip = await getTripById(req.query.id.toString())
      res.status(200).json(trip)
    } 
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}