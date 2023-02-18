import locationAutocomplete from "../../lib/location-autocomplete"
import LocationInput from "./location-input"
import ReturnDropdown from "./return-dropdown"
import DatePicker from 'react-datepicker'
import styles from './search-form.module.scss'
import "react-datepicker/dist/react-datepicker.css"
import { When } from "react-if"
import useSearchStore from "../../stores/search.store"
import useSubmitSearch from "../../hooks/useSubmitSearch"

export default function SearchFormOneLine() {
  const searchStore = useSearchStore()
  const submit = useSubmitSearch()

 return (
  <form onSubmit={submit} className="box">
    <div className='columns'>
      <div className="column is-1">
        <ReturnDropdown />
      </div>
      <div className="column is-2">
        <LocationInput
          fetcher={locationAutocomplete}
          value={searchStore.from}
          onChange={(l) => searchStore.setDeparture(l.value)}
        />
      </div>
      <div className="column is-2">
        <LocationInput
          value={searchStore.to}
          fetcher={(v) => locationAutocomplete(v, searchStore.from)}
          onChange={(l) => searchStore.setDestination(l.value)}
        />
      </div>
      <div className="column is-1">
      <DatePicker wrapperClassName={styles.datepicker} selected={new Date(searchStore.departureDate)} onChange={value => value && searchStore.setDepartureDate(value)} />
      </div>
      <When condition={searchStore.return}>
        <div className="column is-1">
        <DatePicker wrapperClassName={styles.datepicker} selected={new Date(searchStore.returnDate)} onChange={value => value && searchStore.setReturnDate(value)} />
        </div>
      </When>
      <div className="column is-1">
        <button type="submit" className="button is-primary is-fullwidth">Search</button>
      </div>
    </div>
  </form>
 )
}