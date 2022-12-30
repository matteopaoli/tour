import Image from "next/image"
import Link from "next/link"
import { Trip } from "../types"
import mockImage from '../public/sample.png'

interface SearchResultProps {
  trip: Trip
}

const SearchResult = ({ trip }: SearchResultProps): JSX.Element => (
  <Link href={`/trip/${trip._id.toString()}`} className="box">
    <div className="columns is-vcentered">
      <div className="column is-2">
        <Image className="image is-96x96" src={mockImage} alt="sample image" />
      </div>
      <div className="column is-5">
        <h2 className="title is-4">{trip.points[0].name}</h2>
        <p className="subtitle is-6">{new Date(trip.dateStart).toTimeString()}</p>
      </div>
      <div className="column is-5">
        <h2 className="title is-4">{trip.points[1].name}</h2>
        <p className="subtitle is-6">{new Date(trip.dateEnd).toTimeString()}</p>
      </div>
    </div>
  </Link>
)

export default SearchResult
