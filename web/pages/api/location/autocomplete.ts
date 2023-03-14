import { Filter } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../../lib/mongodb'
import { Trip } from '../../../types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: `Method ${req.method ?? ''} Not Allowed` })
    return
  }

  try {
    const { location, from } = req.query
      const collection = (await connectToDatabase()).collection<Trip>('trips')
      let filter: Filter<Trip>
      if (from) {
        if (location) filter = { 'points.0.name': from, 'points.1.name': { '$regex': location.toString() } }
        else filter = { 'points.0.name': from }
      }
      else if (location) filter = { 'points.0.name': { '$regex': location.toString() } }  
      else filter = {}

      const data = await collection.find(filter).toArray()
      const uniqueLocations = Array.from(new Set(data.map((item) => item.points[from? 1 : 0].name)))
      res.status(200).json(uniqueLocations)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}