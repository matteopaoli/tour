import Image, { StaticImageData } from "next/image"
import { Trip } from "../types"
import mockImage from '../public/bus-image.jpg'
import chevronIcon from '../public/icons/chevron-right.svg'
import getTime from '../lib/client/get-time'
import { useRouter } from "next/router"
import useSearchStore from "../stores/search.store"

interface SearchResultProps {
  trip: Trip
}

const SearchResult = ({ trip }: SearchResultProps): JSX.Element => {
  const router = useRouter()
  const quantity = useSearchStore(s => s.passengers)

  const onClick = () => {
    void router.push(`/checkout/${trip._id.toString()}?q=${quantity}`)
  }

  return (
    <div className="box columns is-vcentered my-5">
      <div className="column is-2 is-hidden-mobile">
        <Image className="image is-96x96" src={mockImage} alt="sample image" />
      </div>
      <div className="column is-10 columns is-vcentered">
        <div className="column is-one-third">
          <div className="columns is-mobile">
            <div className="column is-9">
              <h2 className="title is-5">{trip.points[0].name}</h2>
            </div>
            <div className="column is-3 is-hidden-tablet">
              <p className="has-text-weight-bold is-half subtitle is-6">{getTime(trip.dateStart)}</p>
            </div>
          </div>
        </div>
        <div className="column is-one-third">
          <div className="columns is-mobile">
              <div className="column is-9">
                <h2 className="title is-5">{trip.points[1].name}</h2>
              </div>
              <div className="column is-3 is-hidden-tablet">
                <p className="has-text-weight-bold is-half subtitle is-6">{getTime(trip.dateEnd)}</p>
              </div>
            </div>
        </div>
        <div className="column is-one-third">
          {/* <h2 className="is-5 has-text-right">{trip.price}฿</h2> */}
          <div className="columns is-vcentered is-hidden-mobile">
            <div className="column">
              <p className="has-text-weight-bold subtitle is-6">{getTime(trip.dateStart)}</p>
            </div>
            <div className="column">
              <p className="is-one-third has-text-centered">{'->'}</p>
            </div>
            <div className="column">
              <p className="has-text-weight-bold is-half subtitle is-6">{getTime(trip.dateEnd)}</p>
            </div>
          </div>
          <button className="button is-primary is-2 has-text-weight-bold is-fullwidth" onClick={onClick}>
            <Image src={chevronIcon as StaticImageData} alt="icon" />
          </button>
        </div>
        </div>
      </div>
  )
}

export default SearchResult

