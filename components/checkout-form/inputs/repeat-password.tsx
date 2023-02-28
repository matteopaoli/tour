import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface RepeatPasswordProps {
  error: FieldError | undefined;
  triggerValidation: () => void;
  field: UseFormRegisterReturn<"repeatPassword">;
}

export default function RepeatPassword({
  error,
  triggerValidation,
  field,
}: RepeatPasswordProps): JSX.Element {
  return (
    <div className="column is-6 field">
    <label className="label">Repeat Password</label>
    <div className="control">
      <input
        {...field}
        className={`input ${error ? "is-danger" : ""}`}
        aria-invalid={error ? "true" : "false"}
        type="password"
        placeholder="Repeat Password"
        onBlur={triggerValidation}
      />
    </div>
    {error && (
      <p className="help is-danger">{error.message}</p>
    )}
  </div>
  );
}
