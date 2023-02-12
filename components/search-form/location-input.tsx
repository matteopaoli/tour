import { useEffect, useState } from 'react'
import Select, { SingleValue } from 'react-select'
import { LocationOption } from '../../types'
import customStyle from '../../lib/react-select-style'

interface LocationInputProps {
  value: LocationOption,
  onChange: (l: LocationOption) => void
  fetcher: (v: string) => Promise<LocationOption[]>
}

export default function   LocationInput({ fetcher, value, onChange }: LocationInputProps) {
  const [inputValue, setInputValue] = useState<string>('')
  const [suggestions, setSuggestions] = useState<LocationOption[]>([])

  const getSuggestions = (): void => {
    fetcher(inputValue).then(setSuggestions).catch(alert)
  }

  useEffect(getSuggestions, [inputValue, fetcher]) 

  useEffect(getSuggestions, [inputValue, fetcher]) 

  const changeValue = (value: SingleValue<LocationOption>) => {
    if (value) {
      onChange(value)
    }
  }

  return (
    <Select
      options={suggestions}
      value={value}
      inputValue={inputValue}
      onInputChange={setInputValue}
      onChange={changeValue}
      placeholder="Enter departure"
      components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
      styles={customStyle}
    />
  )
}