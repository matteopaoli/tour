import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import Select from 'react-select'
import DatePicker from 'react-datepicker'
import styles from './search-form.module.scss'

import "react-datepicker/dist/react-datepicker.css"
import { Else, If, Then } from 'react-if'
import LocationInput from './location-input'
import { LocationOption } from '../../types'
import locationAutocomplate from '../../lib/location-autocomplete'
import customStyle from '../../lib/react-select-style'

interface Option {
  label: string,
  value: string
}

interface SearchFormProps {
  singleLine?: boolean
}

const SearchForm = ({ singleLine = false }: SearchFormProps) => {
  const [departureDate, setDepartureDate] = useState<Date | null>(new Date('March 7, 2023 03:24:00'))
  const [returnDate, setReturnDate] = useState<Date | null>(new Date('March 8, 2023 03:24:00'))
  const [tripType, setTripType] = useState<Option | null>({ label: 'Return', value: 'return' }) 
  const [departure, setDeparture] = useState<LocationOption>({ value: 'Bangkok train station', label: 'Bangkok train station' })
  const [destination, setDestination] = useState<LocationOption>({ value: 'Bangkok Suvarnabhumi Airport', label: 'Bangkok Suvarnabhumi Airport' })


  const tripOptions = useMemo<Option[]>(() => [
    { label: 'Onward', value: 'onward' },
    { label: 'Return', value: 'return' }
  ], [])

  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (departure.value && destination.value && departureDate) {
      void router.push(`/trips?departure=${departure.value}&destination=${destination.value}&departureDate=${departureDate.toISOString()}`)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="box">
      <If condition={singleLine}>
        <Then>
          <div className='columns'>
            <div className="column is-1">
              <Select
                options={tripOptions}
                value={tripType}
                onChange={setTripType}
                styles={customStyle}
              />
            </div>
            <div className="column is-2">
              <LocationInput
                fetcher={locationAutocomplate}
                value={departure}
                onChange={setDeparture}
              />
            </div>
            <div className="column is-2">
              <LocationInput
                value={destination}
                fetcher={(v) =>locationAutocomplate(v, departure.value)}
                onChange={setDestination}
              />
            </div>
            <div className="column is-1">
              <DatePicker wrapperClassName={styles.datepicker} selected={departureDate} onChange={value => setDepartureDate(value)} />
            </div>
            {tripType?.value === 'return' && (
              <div className="column is-1">
                <DatePicker wrapperClassName={styles.datepicker} selected={returnDate} onChange={value => setReturnDate(value)} />
              </div>
            )}
          </div>
        </Then>
        <Else>
          <div className='columns'>
            <div className="column is-2">
              <Select
                options={tripOptions}
                value={tripType}
                onChange={setTripType}
                styles={customStyle}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column">
              <LocationInput
                fetcher={locationAutocomplate}
                value={departure}
                onChange={setDeparture}
              />
            </div>
            <div className="column">
              <LocationInput
                value={destination}
                fetcher={(v) =>locationAutocomplate(v, departure.value)}
                onChange={setDestination}
              />
            </div>
          </div>
          <div className="columns">
            <div className="column is-6">
              <DatePicker wrapperClassName={styles.datepicker} selected={departureDate} onChange={value => setDepartureDate(value)} />
            </div>
            {tripType?.value === 'return' && (
              <div className="column is-6">
                <DatePicker wrapperClassName={styles.datepicker} selected={returnDate} onChange={value => setReturnDate(value)} />
              </div>
            )}

          </div>
          <button type="submit" className="button is-primary is-fullwidth">Search</button>
        </Else>
      </If>
    </form>
  )
}

export default SearchForm
