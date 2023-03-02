import getTime from "../lib/client/get-time"
import { Trip } from "../types"

interface CartItemProps {
  item: Trip
}

export default function CartItem({ item }: CartItemProps): JSX.Element {
  return (
    <div 
      className="box has-background-white-ter p-0 pt-3"
      style={{ border: '1px solid hsl(0, 0%, 70%)' }}
      key={item._id as string}
    >
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