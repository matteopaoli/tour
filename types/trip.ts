import { ObjectId } from 'mongodb'

type Feature = 'WC' | 'e-ticket' | 'instant-confirmation' | 'no-refund'

interface TripPoint {
  name: string;
  time: Date
  coordinates: { lat: number, long: number }
}

export default interface Trip {
  _id: string | ObjectId;
  points: TripPoint[]
  dateStart: Date | string;
  dateEnd: Date | string;
  operator: string;
  price: number
  features: Feature[]
  seatsAvailable: number
}
