import { FieldError, UseFormRegisterReturn } from "react-hook-form"

interface LastNameProps {
  error: FieldError | undefined;
  triggerValidation: () => void;
  field: UseFormRegisterReturn<"lastName">
}

export default function LastName({
  error,
  triggerValidation,
  field,
}: LastNameProps): JSX.Element {
  return (
    <div className="column is-6 field">
      <label className="label">Last Name</label>
      <div className="control">
        <input
          {...field}
          className={`input ${error ? "is-danger" : ""}`}
          aria-invalid={error ? "true" : "false"}
          type="text"
          placeholder="First Name"
          onBlur={triggerValidation}
        />
      </div>
      {error?.type === "required" && (
        <p className="help is-danger">Last name is required</p>
      )}
    </div>
  )
}
