import { Filter } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { connect, getDb } from '../../lib/mongodb'
import { SearchResponse, Trip } from '../../types'

export async function searchTrips(departure: string, destination: string, departureDate: string): Promise<SearchResponse> {
  const startOfDate = new Date(departureDate)
  const endOfDate = new Date(departureDate)
  endOfDate.setDate(endOfDate.getDate() + 1)

  const filters: Filter<Trip> = { 'points.0.name': departure , 'points.1.name': destination, dateStart: { $gte: startOfDate, $lt: endOfDate } }
  await connect()
  const collection = getDb().collection<Trip>('trips')
  
  return [await collection.find(filters).toArray()]
}

export async function searchTripsWithReturn(departure: string, destination: string, departureDate: string, returnDate: string): Promise<SearchResponse> {
  const startOfOutboundDate = new Date(departureDate)
  const endOfOutboundDate = new Date(departureDate)
  const startOfReturnDate = new Date(returnDate)
  const endOfReturnDate = new Date(returnDate)
  endOfOutboundDate.setDate(startOfOutboundDate.getDate() + 1)
  endOfReturnDate.setDate(startOfReturnDate.getDate() + 1)

  const filtersOutbound: Filter<Trip> = { 'points.0.name': departure, 'points.1.name': destination, dateStart: { $gte: startOfOutboundDate, $lt: endOfOutboundDate } }
  const filtersReturn: Filter<Trip> = { 'points.0.name': destination, 'points.1.name': departure, dateStart: { $gte: startOfReturnDate, $lt: endOfReturnDate } }

  await connect()
  const collection = getDb().collection<Trip>('trips')
  
  return Promise.all([
    collection.find(filtersOutbound).toArray(),
    collection.find(filtersReturn).toArray()
  ])
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { departure, destination, departureDate, returnDate, isReturn } = req.query
    if (isReturn) {
      if ([departure, destination, departureDate, returnDate].every(Boolean)) {
        const results = await searchTripsWithReturn(departure!.toString(), destination!.toString(), departureDate!.toString(), returnDate!.toString())
        res.status(200).json(results)
      }
    }
    else if (departure && destination && departureDate) {
      const results = await searchTrips(departure.toString(), destination.toString(), departureDate.toString())
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