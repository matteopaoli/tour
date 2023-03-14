export default interface CheckoutFormFields {
  firstName: string
  lastName: string
  mail: string
  documentNumber: string
  dob: string | Date
  password: string
  repeatPassword: string
  accountSignup: boolean
}