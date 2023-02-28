import ReactDatePicker from "react-datepicker"

interface DobDatePickerProps {
  value: Date | string | null
  onChange: (v: Date) => void
  onBlur: () => void
}

export default function DobDatepicker({ value, onChange, onBlur }: DobDatePickerProps): JSX.Element {
  return (
    <ReactDatePicker
      onChange={onChange}
      selected={value? new Date(value): null}
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
      className="input"
      onBlur={onBlur}
    />
  )
} 