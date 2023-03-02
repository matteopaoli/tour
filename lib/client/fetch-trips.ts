import { Search, Trip } from "../../types"

export default async function fetchTrips(s: Search): Promise<Trip[]> {
  const qs: string = new URLSearchParams({ 
    departure: s.from,
    destination: s.to,
    departureDate: s.departureDate,
    returnDate: s.isReturn? s.returnDate : '',
    isReturn: s.isReturn.toString() 
  }).toString()

  return fetch(`/api/search?${qs}`)
  .then(res => res.json())
  .then((data: Trip[]) => {
    return data
  })
  .catch(() => [])
} 