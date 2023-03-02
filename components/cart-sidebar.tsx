import CartItem from "./cart-item"
import { Trip } from "../types"

interface CartSidebarProps {
  trip: Trip,
  quantity: number,
  total: number
}

export default function CartSidebar({ trip, quantity, total }: CartSidebarProps) {
  return (
    <div className="column is-3">
      <div className="box py-5">
        <h2 className="is-size-3 has-text-weight-bold">Your cart</h2>
        <CartItem item={trip} />
        <h3>{quantity} Passenger{quantity > 1? 's' : ''}</h3>
        <h2 className="is-size-4 has-text-weight-bold is-flex is-justify-content-space-between"><div>Total:</div><div>{total}฿</div></h2>
      </div>
    </div>
  )
}