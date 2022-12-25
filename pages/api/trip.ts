import { NextApiRequest, NextApiResponse } from 'next';
import { getTrips, getTripById } from '../../lib/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.query.id) {
      // id was specified in the query string
      const trip = await getTripById(req.query.id.toString());
      res.status(200).json({ trip });
    } else {
      // id was not specified in the query string
      const allTrips = await getTrips()
      res.status(200).json({ trips: allTrips });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}