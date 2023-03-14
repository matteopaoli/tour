import { useCallback, useEffect, useMemo, useState } from 'react'
import Select, { SingleValue } from 'react-select'
import { Option } from '../../types'
import customStyle from '../../lib/client/react-select-style'

interface LocationInputProps {
  value: string,
  onChange: (l: Option) => void
  fetcher: (v: string) => Promise<Option[]>
}

export default function LocationInput({ fetcher, value = '', onChange }: LocationInputProps) {
  const [inputValue, setInputValue] = useState<string>('')
  const [suggestions, setSuggestions] = useState<Option[]>([])

  const getSuggestions = useCallback((v: string): void => {
    fetcher(v).then(setSuggestions).catch(alert)
  }, [fetcher])

  useEffect(() => {
    if (inputValue) {
      getSuggestions(inputValue)
    }
  }, [getSuggestions, inputValue]) 

  const changeValue = (value: SingleValue<Option>) => {
    if (value) {
      onChange(value)
    }
  }

  const optionValue = useMemo<Option>(() => ({
    value,
    label: value
  }), [value])

  return (
    <Select
      options={suggestions}
      value={optionValue}
      inputValue={inputValue}
      onInputChange={setInputValue}
      onChange={changeValue}
      placeholder="Enter departure"
      components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
      styles={customStyle}
    />
  )
}