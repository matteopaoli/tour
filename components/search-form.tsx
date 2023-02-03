import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Select from 'react-select'
import Input from './input'
import DatePicker from 'react-datepicker'
import styles from './search-form.module.scss'

import "react-datepicker/dist/react-datepicker.css";

interface Option {
  label: string,
  value: string
}

const SearchForm = () => {
  const [departureInputValue, setDepartureInputValue] = useState<string>('')
  const [destinationInputValue, setDestinationInputValue] = useState<string>('')
  const [departureSelection, setDepartureSelection] = useState<Option | null>(null)
  const [destinationSelection, setDestinationSelection] = useState<Option | null>(null)
  const [departureSuggestions, setDepartureSuggestions] = useState<Option[]>([])
  const [destinationSuggestions, setDestinationSuggestions] = useState<Option[]>([])
  const [departureDate, setDepartureDate] = useState<Date | null>(new Date)
  const [returnDate, setReturnDate] = useState<Date | null>(new Date(Date.now() + 24 * 60 * 60 * 1000))

  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (departureSelection?.value && destinationSelection?.value) {
      void router.push(`/trips?departure=${departureSelection.value}&destination=${destinationSelection.value}`)
    }
  }

  useEffect(() => {
    const url = `/api/location/autocomplete${departureInputValue? `?location=${departureInputValue}` : ''}`
    fetch(url)
      .then((response) => response.json())
      .then((data: string[]) => {
        const options: Option[] = data.map((suggestion) => ({ label: suggestion, value: suggestion }))
        setDepartureSuggestions(options)
    })
    .catch((err: string) => new Error(err))
  }, [departureInputValue])

  useEffect(() => {
    if (departureSelection?.value) {
      const url = `/api/location/autocomplete?from=${departureSelection.value}${destinationInputValue? `&location=${destinationInputValue}` : ''}`
      fetch(url)
        .then((response) => response.json())
        .then((data: string[]) => {
          const options: Option[] = data.map((suggestion) => ({ label: suggestion, value: suggestion }))
          setDestinationSuggestions(options)
        })
        .catch((err: string) => new Error(err))
    }
  }, [destinationInputValue, departureInputValue, departureSelection])

  return (
    <form onSubmit={handleSubmit} className="box">
      <div className="columns">
        <div className="column">
          <Select
            options={departureSuggestions}
            value={departureSelection}
            inputValue={departureInputValue}
            onInputChange={setDepartureInputValue}
            onChange={setDepartureSelection}
            placeholder="Enter departure"
            components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
          />
        </div>
        <div className="column">
          <Select
            options={destinationSuggestions}
            value={destinationSelection}
            inputValue={destinationInputValue}
            onInputChange={setDestinationInputValue}
            onChange={setDestinationSelection}
            placeholder="Enter destination"
            components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <DatePicker wrapperClassName={styles.datepicker} selected={departureDate} onChange={value => setDepartureDate(value)} />
        </div>
        <div className="column">
          <DatePicker wrapperClassName={styles.datepicker} selected={returnDate} onChange={value => setReturnDate(value)} />
        </div>
        <div className="column">
          <DatePicker wrapperClassName={styles.datepicker} selected={returnDate} onChange={value => setReturnDate(value)} />
        </div>
      </div>
      <button type="submit" className="button is-primary is-fullwidth">Search</button>
    </form>
  )
}

export default SearchForm
