import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface EmailProps {
  error: FieldError | undefined;
  triggerValidation: () => void;
  field: UseFormRegisterReturn<"mail">;
}

export default function Email({
  error,
  triggerValidation,
  field,
}: EmailProps): JSX.Element {
  return (
    <div className="column is-6 field">
      <label className="label">Email Address</label>
      <div className="control">
        <input
          {...field}
          className={`input ${error ? "is-danger" : ""}`}
          aria-invalid={error ? "true" : "false"}
          type="email"
          placeholder="Email Address"
          onBlur={triggerValidation}
        />
      </div>
      {error && <p className="help is-danger">{error.message!}</p>}
    </div>
  )
}
