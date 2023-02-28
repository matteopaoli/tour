import { Controller, useForm } from "react-hook-form";
import { addYears } from "date-fns";
import { useState } from "react";
import DobDatepicker from "./dob-datepicker";
import ReactDatePicker from "react-datepicker";
import CheckoutFormFields from "../../types/checkout-form";
import FirstName from "./inputs/first-name";
import LastName from "./inputs/last-name";
import Email from "./inputs/email";
import Dob from "./inputs/dob";
import Document from "./inputs/document";
import AccountSignup from "./inputs/account-signup";
import Password from "./inputs/password";
import RepeatPassword from "./inputs/repeat-password";

export default function CheckoutForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    control,
    trigger,
    watch,
  } = useForm<CheckoutFormFields>({
    defaultValues: {
      firstName: "",
      lastName: "",
      mail: "",
      documentNumber: "",
      dob: "",
      password: "",
      repeatPassword: "",
      showPasswordFields: false,
    },
  });
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const onSubmit = (data) => console.log(data);

  const dobField = register("dob", {
    required: true,
    validate: (value): string | undefined => {
      const dobDate = new Date(value);
      if (addYears(dobDate, 14) > new Date()) {
        return "You must be at least 14 years old";
      }
      return undefined;
    },
  });

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
  });

  const repeatPasswordField = register("repeatPassword", {
    required: "Please repeat your password",
    validate: (value) => value === watch("password"),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="box">
      <div className="columns">
        <FirstName
          field={{ ...register("firstName", { required: true }) }}
          error={errors.firstName}
          triggerValidation={() => trigger("firstName")}
        />
        <LastName
          field={{ ...register("lastName", { required: true }) }}
          error={errors.lastName}
          triggerValidation={() => trigger("lastName")}
        />
      </div>
      <div className="columns">
        <Email
          field={{
            ...register("mail", { required: "Email Address is required" }),
          }}
          error={errors.mail}
          triggerValidation={() => trigger("mail")}
        />
        <Dob
          field={dobField}
          error={errors.dob}
          triggerValidation={() => trigger("dob")}
          control={control}
        />
      </div>
      <div className="columns">
        <Document
          field={{ ...register("documentNumber", { required: true }) }}
          triggerValidation={() => trigger("documentNumber")}
          error={errors.documentNumber}
        />
      </div>
      <AccountSignup 
        field={{ ...register('accountSignup') }}
        onChange={() => setShowPasswordFields((prevState) => !prevState)}
      />
      {showPasswordFields && (
        <div className="columns">
          <Password 
            field={passwordField}
            triggerValidation={() => trigger('password')}
            error={errors.password}
          />
          <RepeatPassword
            field={repeatPasswordField}
            triggerValidation={() => trigger('repeatPassword')}
            error={errors.repeatPassword}
          />
        </div>
      )}
    </form>
  );
}
