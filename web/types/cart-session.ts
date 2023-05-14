import { ObjectId } from "mongodb"
import CartItem from "./cart-item"

export default interface CartSession {
  _id?: string | ObjectId
  userId: string | ObjectId
  items: CartItem[]
  createdAt: Date
  modifiedAt: Date
}