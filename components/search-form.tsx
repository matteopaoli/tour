import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Select from 'react-select'

type Option = {
  label: string
  value: string
}

const SearchForm = () => {
  const [departureInputValue, setDepartureInputValue] = useState<string>('')
  const [destinationInputValue, setDestinationInputValue] = useState<string>('')
  const [departureSelection, setDepartureSelection] = useState<Option | null>(null)
  const [destinationSelection, setDestinationSelection] = useState<Option | null>(null)
  const [departureSuggestions, setDepartureSuggestions] = useState<Option[]>([])
  const [destinationSuggestions, setDestinationSuggestions] = useState<Option[]>([])
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    void router.push(`/trips?departure=${departureSelection?.value}&destination=${destinationSelection?.value}`)
  }

  // const loadDepartureOptions = async (inputValue: string, callback) => {
  //   const data: string[] = await fetch(`/api/location/autocomplete?location=${inputValue}`).then((response) => response.json())
  //   callback(data.map((suggestion: string) => ({ value: suggestion, label: suggestion })))
  // }

  useEffect(() => {
    const url = `/api/location/autocomplete${departureInputValue? `?location=${departureInputValue}` : ''}`
    fetch(url)
      .then((response) => response.json())
      .then((data: string[]) => {
        console.log(data);
        const options: Option[] = data && data.map((suggestion) => ({ label: suggestion, value: suggestion }))
        setDepartureSuggestions(options)
    })
  }, [departureInputValue])

  useEffect(() => {
    const url = `/api/location/autocomplete?from=${departureSelection?.value}${destinationInputValue? `&location=${destinationInputValue}` : ''}`
    fetch(url)
      .then((response) => response.json())
      .then((data: string[]) => {
        const options: Option[] = data.map((suggestion) => ({ label: suggestion, value: suggestion }))
        setDestinationSuggestions(options)
    })
  }, [destinationInputValue, departureInputValue, departureSelection])

  // const loadDestinationOptions = (inputValue: string): Promise<Option[]> => {
  //   return fetch(`/api/location/autocomplete?location=${inputValue}&from=${departure}`)
  //     .then((response) => response.json())
  //     .then((json) => {
  //       return json.map((suggestion: string) => ({
  //         value: suggestion,
  //         label: suggestion,
  //       }));
  //   });
  // }

  return (
    <form onSubmit={handleSubmit}>
      <Select
        options={departureSuggestions}
        value={departureSelection}
        inputValue={departureInputValue}
        onInputChange={setDepartureInputValue}
        onChange={setDepartureSelection}
        placeholder="Enter departure"
      />
      <Select
        options={destinationSuggestions}
        value={destinationSelection}
        inputValue={destinationInputValue}
        onInputChange={setDestinationInputValue}
        onChange={setDestinationSelection}
        placeholder="Enter destination"
      />
      <button type="submit" className="button is-primary is-fullwidth">Search</button>
    </form>
  )
}

export default SearchForm
