import { Filter } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { getTrips } from '../../lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { departure, destination } = req.query;
    if (departure && destination) {
      const results = await getTrips(departure.toString(), destination.toString())
      if (results) {
        res.status(200).json(results)
      }
      else {
        res.status(404).json({ status: 404, error: 'No results' })
      }
    }
    else {
      res.status(400).json({ status: 400, error: 'Bad request' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}