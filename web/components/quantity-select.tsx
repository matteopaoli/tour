import Select from 'react-select'
import customStyle from '../lib/client/react-select-style'

export default function QuantitySelect(): JSX.Element { 
  const options = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
  ]

  return (
    <Select 
      options={options}
      formatOptionLabel={({ value }) => `${value} Passenger${+value > 1? 's' : ''}`}
      styles={customStyle}
    />
  )
}