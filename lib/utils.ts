import { Filter, ObjectId } from 'mongodb';
import { Trip } from '../types';
import { connect, getDb } from './mongodb';



export async function getTrips(departure?: string, destination?: string,): Promise<Trip[]> {
  const filters: Filter<Trip> = { 'points.0.name': departure , 'points.1.name': destination }
  Object.keys(filters).forEach(key => filters[key] === undefined ? delete filters[key] : {});

  await connect();
  const db = getDb();
  const collection = db.collection<Trip>('trips');
  const trips = await collection.find(filters).toArray();
  return trips;
}


export async function getTripById(id: string): Promise<Trip | null> {
  await connect();
  const db = getDb();
  const collection = db.collection<Trip>('trips');
  const trip = await collection.findOne({ _id: new ObjectId(id)  });

  return trip;
}