import Link from "next/link"
import { Trip } from "../types"

interface SearchResultProps {
  trip: Trip
}

const SearchResult = ({ trip }: SearchResultProps): JSX.Element => (
  <Link href={`/trip/${trip._id.toString()}`} className="box">
    <h2 className="title is-4">{trip.points.map(x => x.name).join(' - ')}</h2>
    <p className="subtitle is-6">{trip.dateStart.toString()}</p>
    <p className="subtitle is-6">{trip.dateEnd.toString()}</p>
    {/* <a className="is-size-7" href={trip.url}>{trip.url}</a> */}
  </Link>
)

export default SearchResult
