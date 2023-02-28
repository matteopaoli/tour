import { ObjectId } from "mongodb"

export default interface User {
  _id: string | ObjectId;
  email: string
  password: string
  firstName: string
  lastName: string
  documentNumber: string
  dob: string
  createdAt?: Date
  modifiedAt?: Date
}