import { FieldError, UseFormRegister } from "react-hook-form"
import CheckoutFormFields from "../../../types/checkout-form"

interface PasswordProps {
  error: FieldError | undefined;
  triggerValidation: () => void;
  register: UseFormRegister<CheckoutFormFields>
}

export default function Password({
  error,
  triggerValidation,
  register,
}: PasswordProps): JSX.Element {

  const passwordField = register("password", {
    required: "Password is required",
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },
    pattern: {
      value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
      message:
        "Password must contain at least one uppercase letter, one lowercase letter, and one number",
    },
  })

  return (
    <div className="column is-6 field">
      <label className="label">Password</label>
      <div className="control">
        <input
          {...passwordField}
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
  )
}
