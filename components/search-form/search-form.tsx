import React from 'react'
import DatePicker from 'react-datepicker'
import styles from './search-form.module.scss'

import "react-datepicker/dist/react-datepicker.css"
import LocationInput from './location-input'
import locationAutocomplete from '../../lib/location-autocomplete'
import ReturnDropdown from './return-dropdown'
import useSearchStore from '../../stores/search.store'
import useSubmitSearch from '../../hooks/useSubmitSearch'

const SearchForm = () => {
  const searchStore = useSearchStore()
  const submit = useSubmitSearch()

  return (
    <form onSubmit={submit} className="box">
    <div className='columns'>
      <div className="column is-2">
        <ReturnDropdown />
      </div>
    </div>
    <div className="columns">
      <div className="column">
        <LocationInput
          fetcher={locationAutocomplete}
          value={searchStore.from}
          onChange={(l) => searchStore.setDeparture(l.value)}
        />
      </div>
      <div className="column">
        <LocationInput
          value={searchStore.to}
          fetcher={(v) => locationAutocomplete(v, searchStore.from)}
          onChange={(l) => searchStore.setDestination(l.value)}
        />
      </div>
    </div>
    <div className="columns">
      <div className="column is-6">
        <DatePicker wrapperClassName={styles.datepicker} selected={new Date(searchStore.departureDate)} onChange={value => value && searchStore.setDepartureDate(value)} />
      </div>
      {searchStore.isReturn && (
        <div className="column is-6">
          <DatePicker wrapperClassName={styles.datepicker} selected={new Date(searchStore.returnDate)} onChange={value => value && searchStore.setReturnDate(value)} />
        </div>
      )}

    </div>
    <button type="submit" className="button is-primary is-fullwidth">Search</button>
    </form>
  )
}

export default SearchForm
