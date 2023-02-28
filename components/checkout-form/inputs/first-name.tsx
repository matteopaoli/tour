import { FieldError, UseFormRegisterReturn } from "react-hook-form"

interface FirstNameProps {
  error: FieldError | undefined;
  triggerValidation: () => void;
  field: UseFormRegisterReturn<"firstName">
}

export default function FirstName({
  error,
  triggerValidation,
  field,
}: FirstNameProps): JSX.Element {
  return (
    <div className="column is-6 field">
      <label className="label">First Name</label>
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
        <p className="help is-danger">First name is required</p>
      )}
    </div>
  )
}
