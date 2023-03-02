import React from 'react'
import DatePicker from 'react-datepicker'
import styles from './search-form.module.scss'

import "react-datepicker/dist/react-datepicker.css"
import LocationInput from './location-input'
import locationAutocomplete from '../../lib/client/location-autocomplete'
import ReturnDropdown from './return-dropdown'
import useSearchStore from '../../stores/search.store'
import useSubmitSearch from '../../hooks/useSubmitSearch'

const SearchForm = () => {
  const search = useSearchStore()
  const submit = useSubmitSearch()


  return (
    <form 
      onSubmit={e => {
        e.preventDefault()
        submit(search.from, search.to, search.departureDate, search.passengers)
      }} 
      className="box"
    >
    <div className='columns'>
      <div className="column is-2">
        <ReturnDropdown />
      </div>
    </div>
    <div className="columns">
      <div className="column">
        <LocationInput
          fetcher={locationAutocomplete}
          value={search.from}
          onChange={(l) => search.setDeparture(l.value)}
        />
      </div>
      <div className="column">
        <LocationInput
          value={search.to}
          fetcher={(v) => locationAutocomplete(v, search.from)}
          onChange={(l) => search.setDestination(l.value)}
        />
      </div>
    </div>
    <div className="columns">
      <div className="column is-6">
        <DatePicker wrapperClassName={styles.datepicker} selected={new Date(search.departureDate)} onChange={value => value && search.setDepartureDate(value)} />
      </div>
      {search.isReturn && (
        <div className="column is-6">
          <DatePicker wrapperClassName={styles.datepicker} selected={new Date(search.returnDate)} onChange={value => value && search.setReturnDate(value)} />
        </div>
      )}

    </div>
    <button type="submit" className="button is-primary is-fullwidth">Search</button>
    </form>
  )
}

export default SearchForm
