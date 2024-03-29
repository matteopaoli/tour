// import { Filter } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
// import { connectToDatabase } from '../../lib/mongodb'
// import { Trip } from '../../types'

export async function uploadTrips(): Promise<void> {
  // const filters: Filter<Trip> = { 'points.0.name': departure , 'points.1.name': destination }
  // await connect()
  // const collection = getDb().collection<Trip>('trips')

  // for (let i = 2; i <= 31; i++) {
  //   const oneDayOfTrips: Trip[] = [
  //     {
  //       points: [
  //         { name: 'Bangkok Suvarnabhumi Airport', time: new Date(Date.UTC(2023, 2, i, 13, 20)), coordinates: { lat: 13.6899991, long: 100.7479237 } },
  //         { name: 'Bangkok train station', time: new Date(Date.UTC(2023, 2, i, 13, 45)), coordinates: { lat: 13.7393362, long: 100.5146067 } },
  //       ],
  //       operator: 'Paoli Airport Company',
  //       price: 100,
  //       features: [],
  //       seatsAvailable: 20,
  //       dateStart: new Date(Date.UTC(2023, 2, i, 14)),
  //       dateEnd: new Date(Date.UTC(2023, 2, i, 14, 15)),
  //     },
  //     {
  //       points: [
  //         { name: 'Bangkok Suvarnabhumi Airport', time: new Date(Date.UTC(2023, 2, i, 17, 20)), coordinates: { lat: 13.6899991, long: 100.7479237 } },
  //         { name: 'Bangkok train station', time: new Date(Date.UTC(2023, 2, i, 17, 50)), coordinates: { lat: 13.7393362, long: 100.5146067 } },
  //       ],
  //       operator: 'Paoli Airport Company',
  //       price: 100,
  //       features: [],
  //       seatsAvailable: 20,
  //       dateStart: new Date(Date.UTC(2023, 2, i, 16)),
  //       dateEnd: new Date(Date.UTC(2023, 2, i, 16, 15)),
  //     },
  //     {
  //       points: [
  //         { name: 'Bangkok Suvarnabhumi Airport', time: new Date(Date.UTC(2023, 2, i, 20, 10)), coordinates: { lat: 13.6899991, long: 100.7479237 } },
  //         { name: 'Bangkok train station', time: new Date(Date.UTC(2023, 2, i, 20, 30)), coordinates: { lat: 13.7393362, long: 100.5146067 } },
  //       ],
  //       operator: 'Paoli Airport Company',
  //       price: 100,
  //       features: [],
  //       seatsAvailable: 20,
  //       dateStart: new Date(Date.UTC(2023, 2, i, 18)),
  //       dateEnd: new Date(Date.UTC(2023, 2, i, 18, 15)),
  //     },
  //     {
  //       points: [
  //         { name: 'Bangkok Suvarnabhumi Airport', time: new Date(Date.UTC(2023, 2, i, 3, 35)), coordinates: { lat: 13.6899991, long: 100.7479237 } },
  //         { name: 'Bangkok train station', time: new Date(Date.UTC(2023, 2, i, 3, 50)), coordinates: { lat: 13.7393362, long: 100.5146067 } },
  //       ],
  //       operator: 'Paoli Airport Company',
  //       price: 100,
  //       features: [],
  //       seatsAvailable: 20,
  //       dateStart: new Date(Date.UTC(2023, 2, i, 20)),
  //       dateEnd: new Date(Date.UTC(2023, 2, i, 20, 15)),
  //     }
  //   ]
  //   await collection.insertMany(oneDayOfTrips)
  // }

  // collection.remove({ operator: 'Paoli Airport Company' }, {$multi:true})
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await uploadTrips()
  res.status(200).json({ ok: 'ok' })
}

export {}