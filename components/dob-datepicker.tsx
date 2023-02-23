import ReactDatePicker from "react-datepicker"

interface DobDatePickerProps {
  value: Date | null
  onChange: (v: Date) => void
}

export default function DobDatepicker({ value, onChange }: DobDatePickerProps): JSX.Element {
  return (
    <ReactDatePicker
      onChange={onChange}
      selected={value}
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
    />
  )
} 