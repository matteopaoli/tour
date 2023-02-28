import { Control, Controller, FieldError, UseFormRegister } from 'react-hook-form'
import CheckoutFormFields from '../../../types/checkout-form'
import ReactDatePicker from 'react-datepicker'
import { addYears } from 'date-fns'


interface DobProps {
  error: FieldError | undefined;
  triggerValidation: () => void;
  register: UseFormRegister<CheckoutFormFields>
  control: Control<CheckoutFormFields>
}

export default function Dob({
  error,
  triggerValidation,
  register,
  control
}: DobProps): JSX.Element {

  const dobField = register('dob', {
    required: true,
    validate: (value): string | undefined => {
      const dobDate = new Date(value)
      if (addYears(dobDate, 14) > new Date()) {
        return 'You must be at least 14 years old'
      }
      return undefined
    },
  })

  return (
    <div className="column is-6 field">
    <label className="label">Date of Birth</label>
    <div className="control">
      <Controller
        {...dobField}
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
    {error?.type === 'required' && (
      <p className="help is-danger">Date of birth is required</p>
    )}
    {error?.type === 'validate' && (
      <p className="help is-danger">{error.message}</p>
    )}
  </div>
  )
}
