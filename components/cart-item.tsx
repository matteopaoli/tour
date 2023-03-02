import { When } from "react-if"
import getTime from "../lib/client/get-time"
import useCartStore from "../stores/cart.store"
import { Trip } from "../types"

interface CartItemProps {
  item: Trip
  canRemove: boolean
}

export default function CartItem({ item, canRemove }: CartItemProps): JSX.Element {
  const cart = useCartStore()


  return (
    <div 
      className="box has-background-white-ter p-0 pt-3"
      style={{ border: '1px solid hsl(0, 0%, 70%)' }}
      key={item._id as string}
    >
      <div
        className="is-flex is-justify-content-space-between is-align-items-center px-4"
        style={{ borderTopLeftRadius: 15, borderTopRightRadius: 15 }}
      >
        <When condition={canRemove}>
        <button className="button is-text p-0 mt-0" onClick={() => cart.removeItem(item)}>Remove</button> 

        </When>
      </div>
    <div className="px-3">
      <div className="has-text-weight-bold">
        {item.points[0].name}
      </div>
      <div className="has-text-weight-bold">
        {getTime(item.dateStart)}
      </div>
    </div>
    <div className="px-3">
    <div className="has-text-weight-bold">
        {item.points[1].name}
      </div>
      <div className="has-text-weight-bold">
        {getTime(item.dateEnd)}
      </div>
    </div>
    <div 
      className="is-flex is-justify-content-space-between is-align-items-center has-text-weight-bold has-background-primary has-text-white p-3"
      style={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}
    >
      <h6 className="has-text-weight-bold is-size-7">operated by {item.operator}</h6>
    <div 
      className="has-text-weight-bold has-text-white"
      style={{ borderBottomLeftRadius: 15, borderBottomRightRadius: 15 }}
    >
      {item.price}฿
      </div>
    </div>
  </div>
  )
}