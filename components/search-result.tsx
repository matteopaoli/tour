import Image from "next/image"
import { Trip } from "../types"
import mockImage from '../public/sample.png'
import Link from "next/link"

interface SearchResultProps {
  trip: Trip
}

const SearchResult = ({ trip }: SearchResultProps): JSX.Element => {

  return (
    <div className="box columns is-vcentered my-5">
      <div className="column is-2">
        <Image className="image is-96x96" src={mockImage} alt="sample image" />
      </div>
      <div className="column is-10 columns is-multiline">
        <div className="column is-half">
          <h2 className="title is-4">{trip.points[0].name}</h2>
          <p className="subtitle is-6">{new Date(trip.dateStart).toTimeString()}</p>
        </div>
        <div className="column is-half">
          <h2 className="title is-4">{trip.points[1].name}</h2>
          <p className="subtitle is-6">{new Date(trip.dateEnd).toTimeString()}</p>
        </div>
        <Link className="button column is-flex is-primary is-2 is-offset-10" href={`/checkout?id=${trip._id.toString()}`}>Get the ticket</Link>
      </div>
    </div>
  )
}

export default SearchResult
