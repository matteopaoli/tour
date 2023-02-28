import { Control, Controller, FieldError, UseFormRegisterReturn } from "react-hook-form"
import CheckoutFormFields from "../../../types/checkout-form";
import ReactDatePicker from "react-datepicker";

interface DobProps {
  error: FieldError | undefined;
  triggerValidation: () => void;
  field: UseFormRegisterReturn<"dob">
  control: Control<CheckoutFormFields, any>
}

export default function Dob({
  error,
  triggerValidation,
  field,
  control
}: DobProps): JSX.Element {
  return (
    <div className="column is-6 field">
    <label className="label">Date of Birth</label>
    <div className="control">
      <Controller
        {...field}
        control={control}
        render={({ field: { onChange, value } }) => (
          <ReactDatePicker
            onChange={onChange}
            selected={value? new Date(value): null}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            className={`input ${error ? 'is-danger' : ''}`}
            onBlur={triggerValidation}
          />
        )}
      />
    </div>
    {error?.type === "required" && (
      <p className="help is-danger">Date of birth is required</p>
    )}
    {error?.type === "validate" && (
      <p className="help is-danger">{error.message}</p>
    )}
  </div>
  )
}
