import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface PasswordProps {
  error: FieldError | undefined;
  triggerValidation: () => void;
  field: UseFormRegisterReturn<"password">;
}

export default function Password({
  error,
  triggerValidation,
  field,
}: PasswordProps): JSX.Element {
  return (
    <div className="column is-6 field">
      <label className="label">Password</label>
      <div className="control">
        <input
          {...field}
          className={`input ${error ? "is-danger" : ""}`}
          aria-invalid={error ? "true" : "false"}
          type="password"
          placeholder="Password"
          onBlur={triggerValidation}
        />
      </div>
      {error?.type === "required" && (
        <p className="help is-danger">Password is required</p>
      )}
      {error?.type === "pattern" && (
        <p className="help is-danger">
          Password must contain at least one uppercase letter, one lowercase
          letter, one digit, one special character, and be at least 8 characters
          long
        </p>
      )}
    </div>
  );
}
