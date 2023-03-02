import { Filter } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { connectToDatabase } from '../../lib/mongodb'
import { Trip } from '../../types'

export async function searchTrips(departure: string, destination: string, departureDate: string, quantity: number): Promise<Trip[]> {
  const startOfDate = new Date(departureDate)
  const endOfDate = new Date(departureDate)
  endOfDate.setDate(endOfDate.getDate() + 1)

  const filters: Filter<Trip> = { 
    'points.0.name': departure , 
    'points.1.name': destination,
    dateStart: { 
      $gte: startOfDate, 
      $lt: endOfDate 
    },
    seatsAvailable: { $gte: quantity }
  }
  const collection = (await connectToDatabase()).collection<Trip>('trips')
  
  return await collection.find(filters).toArray()
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { departure, destination, date, quantity } = req.query 
    if (departure && destination && date) {
      const results = await searchTrips(departure.toString(), destination.toString(), date.toString(), quantity)
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