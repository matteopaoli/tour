import { ObjectId } from "mongodb"

export default interface CartItem {
  _id: string | ObjectId;
  productId: string | ObjectId
  quantity: number
  createdAt: Date
  modifiedAt: Date
}