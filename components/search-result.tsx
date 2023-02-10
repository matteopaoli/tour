import Image from "next/image"
import { Trip } from "../types"
import mockImage from '../public/bus-image.jpg'
import Link from "next/link"

interface SearchResultProps {
  trip: Trip
}

const SearchResult = ({ trip }: SearchResultProps): JSX.Element => {

  return (
    <div className="box columns is-vcentered my-5">
      <div className="column is-2 is-hidden-mobile">
        <Image className="image is-96x96" src={mockImage} alt="sample image" />
      </div>
      <div className="column is-10 columns">
        <div className="column is-one-third">
          <h2 className="title is-5">{trip.points[0].name}</h2>
          <p className="subtitle is-6">{new Date(trip.dateStart).toTimeString()}</p>
        </div>
        <div className="column is-one-third">
          <h2 className="title is-5">{trip.points[1].name}</h2>
          <p className="subtitle is-6">{new Date(trip.dateEnd).toTimeString()}</p>
        </div>
        <div className="column is-one-third">
          <h2 className="is-5 has-text-right">{trip.price}฿</h2>
          <Link className="button is-primary is-2 has-text-weight-bold" href={`/checkout?id=${trip._id.toString()}`}>Get the ticket</Link>
        </div>
      </div>
    </div>
  )
}

export default SearchResult
