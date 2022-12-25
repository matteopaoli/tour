import { ObjectId } from "mongodb";

type Feature = 'WC' | 'e-ticket' | 'instant-confirmation' | 'no-refund'

type TripPoint = {
  name: string;
  time: Date
  coordinates: { lat: number, long: number }
}

type Trip = {
  _id: string | ObjectId;
  points: TripPoint[]
  dateStart: Date | string;
  dateEnd: Date | string;
  operator: string;
  price: number
  features: Feature[]
}

export default Trip