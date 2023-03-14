import { ObjectId } from "mongodb"

export default interface Discount {
  _id: string | ObjectId;
  name: string
  desc: string
  discount_percent: number
  createdAt: Date
  modifiedAt: Date
}