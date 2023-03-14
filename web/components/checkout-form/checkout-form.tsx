import { useForm } from "react-hook-form"
import { useState } from "react"
import CheckoutFormFields from "../../types/checkout-form"
import FirstName from "./inputs/first-name"
import LastName from "./inputs/last-name"
import Email from "./inputs/email"
import Dob from "./inputs/dob"
import Document from "./inputs/document"
import AccountSignup from "./inputs/account-signup"
import Password from "./inputs/password"
import RepeatPassword from "./inputs/repeat-password"
import { format } from 'date-fns'

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
      firstName: '',
      lastName: '',
      mail: '',
      documentNumber: '',
      dob: '',
      password: '',
      repeatPassword: '',
      accountSignup: false,
    },
  })
  const [showPasswordFields, setShowPasswordFields] = useState<boolean>(false)

  const onSubmit = (data: CheckoutFormFields) => {
    data.dob = format(new Date(data.dob), 'yyyy-MM-dd')
  }

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
          register={register}
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
            register={register}
            triggerValidation={() => trigger('password')}
            error={errors.password}
          />
          <RepeatPassword
            field={{...register("repeatPassword", {
              required: "Please repeat your password",
              validate: (value) => value === watch("password"),
            })}}
            triggerValidation={() => trigger('repeatPassword')}
            error={errors.repeatPassword}
          />
        </div>
      )}
      <button className="button is-primary" type="submit">Submit</button>
    </form>
  )
}
