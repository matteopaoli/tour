import { Filter } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { connect, getDb } from '../../lib/mongodb'
import { Trip } from '../../types'

export async function searchTrips(departure?: string, destination?: string,): Promise<Trip[]> {
  const filters: Filter<Trip> = { 'points.0.name': departure , 'points.1.name': destination }
  await connect()
  const collection = getDb().collection<Trip>('trips')
  return await collection.find(filters).toArray()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { departure, destination } = req.query
    if (departure && destination) {
      const results = await searchTrips(departure.toString(), destination.toString())
      if (results.length > 0) {
        res.status(200).json(results)
      }
      else {
        res.status(404).json({ status: 404, error: 'No results' })
      }
    }
    else {
      res.status(400).json({ status: 400, error: 'Bad request' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}