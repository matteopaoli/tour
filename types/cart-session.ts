import { ObjectId } from "mongodb"

export default interface CartSession {
  _id: string | ObjectId
  userId: string | ObjectId
  total: number
  createdAt: Date
  modifiedAt: Date
}