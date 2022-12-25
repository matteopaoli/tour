import { ObjectId, WithId } from 'mongodb';
import { TripDetails } from '../types';
import { connect, getDb } from './mongodb';

export async function getTrips(): Promise<any[]> {
  await connect();
  const db = getDb();
  const collection = db.collection('trips');
  const trips = await collection.find({}).toArray();
  return trips;
}


export async function getTripById(id: string): Promise<WithId<TripDetails> | null> {
  await connect();
  const db = getDb();
  const collection = db.collection<TripDetails>('trips');
  const trip = await collection.findOne({ _id: new ObjectId(id)  });

  return trip;
}