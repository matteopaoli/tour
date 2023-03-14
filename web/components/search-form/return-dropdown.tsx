import { useMemo } from "react"
import customStyle from "../../lib/client/react-select-style"
import Select from 'react-select'
import useSearchStore from "../../stores/search.store"

export default function ReturnDropdown() {
  const searchStore = useSearchStore()
  const options = useMemo(() => [
    { label: 'Onward', value: 'onward' },
    { label: 'Return', value: 'return' }
  ], [])

  return (
    <Select
      instanceId="return"
      options={options}
      value={searchStore.isReturn? options[1] : options[0]}
      onChange={() => searchStore.setReturn(!searchStore.isReturn)}
      styles={customStyle}
    />
  )
}