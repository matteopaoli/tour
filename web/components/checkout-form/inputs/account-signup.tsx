import { UseFormRegisterReturn } from "react-hook-form"

interface AccountSignupProps {
  field: UseFormRegisterReturn<"accountSignup">
  onChange: () => void
}

export default function AccountSignup({
  field,
  onChange
}: AccountSignupProps): JSX.Element {
  return (
    <div className="field">
    <div className="control">
      <label className="checkbox">
        <input
          {...field}
          type="checkbox"
          className="mr-2"
          onChange={onChange}
        />
        I want to create an account
      </label>
    </div>
  </div>
  )
}
