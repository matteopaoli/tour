import locationAutocomplete from "../../lib/location-autocomplete"
import LocationInput from "./location-input"
import ReturnDropdown from "./return-dropdown"
import DatePicker from 'react-datepicker'
import styles from './search-form.module.scss'
import "react-datepicker/dist/react-datepicker.css"
import { When } from "react-if"
import useSearchStore from "../../stores/search.store"
import { Search } from "../../types"
import { FormEvent } from "react"

interface SearchFormOneLineProps {
  onSubmit: (s: Search, e: FormEvent<HTMLFormElement>) => void
}

export default function SearchFormOneLine({ onSubmit }: SearchFormOneLineProps): JSX.Element {
  const search = useSearchStore()

 return (
  <form onSubmit={(e) => onSubmit(search, e)} className="box">
    <div className='columns'>
      <div className="column is-2 p-1">
        <ReturnDropdown />
      </div>
      <div className="column is-3 p-1">
        <LocationInput
          fetcher={locationAutocomplete}
          value={search.from}
          onChange={(l) => search.setDeparture(l.value)}
        />
      </div>
      <div className="column is-3 p-1">
        <LocationInput
          value={search.to}
          fetcher={(v) => locationAutocomplete(v, search.from)}
          onChange={(l) => search.setDestination(l.value)}
        />
      </div>
      <div className="column is-2 p-1">
      <DatePicker wrapperClassName={styles.datepicker} selected={new Date(search.departureDate)} onChange={value => value && search.setDepartureDate(value)} />
      </div>
      <When condition={search.isReturn}>
        <div className="column is-1 p-1">
        <DatePicker wrapperClassName={styles.datepicker} selected={new Date(search.returnDate)} onChange={value => value && search.setReturnDate(value)} />
        </div>
      </When>
      <div className="column is-1 p-1">
        <button type="submit" className="button is-primary is-fullwidth">Search</button>
      </div>
    </div>
  </form>
 )
}