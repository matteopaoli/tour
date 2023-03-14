import { FieldError, UseFormRegisterReturn } from "react-hook-form"

interface DocumentProps {
  error: FieldError | undefined;
  triggerValidation: () => void;
  field: UseFormRegisterReturn<"documentNumber">
}

export default function Document({
  error,
  triggerValidation,
  field,
}: DocumentProps): JSX.Element {
  return (
    <div className="column is-6 field">
    <label className="label">Passport Number</label>
    <div className="control">
      <input
        {...field}
        className={`input ${error ? "is-danger" : ""}`}
        aria-invalid={error ? "true" : "false"}
        type="text"
        placeholder="Passport Number"
        onBlur={triggerValidation}
      />
    </div>
    {error?.type === "required" && (
      <p className="help is-danger">Passport number is required</p>
    )}
  </div>
  )
}
