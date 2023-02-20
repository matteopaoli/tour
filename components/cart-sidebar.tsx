import { When } from "react-if"
import getTime from "../lib/get-time"
import useCartStore from "../stores/cart.store"
import Link from "next/link"

interface CartSidebarProps {
  withCheckoutButton?: boolean
}

export default function CartSidebar({ withCheckoutButton }: CartSidebarProps) {
  const cart = useCartStore()

  return (
    <div className="column is-3">
      <div className="box py-5">
        <h2 className="is-size-3 has-text-weight-bold">Your cart</h2>
        {cart.items.map(item => (
          <div className="box has-background-white-ter" key={item._id as string}>
            <div className="is-size-6">
              <div>
                {item.points[0].name}
              </div>
              <div className="has-text-weight-bold">
                {getTime(item.dateStart)}
              </div>
            </div>
            <div className="is-size-6">
            <div>
                {item.points[1].name}
              </div>
              <div className="has-text-weight-bold">
                {getTime(item.dateEnd)}
              </div>
              <div className="has-text-right has-text-weight-bold">200฿</div>
            </div>
          </div>
        ))}
        <h2 className="is-size-4 has-text-weight-bold is-flex is-justify-content-space-between"><div>Total:</div><div>200฿</div></h2>
        <When condition={withCheckoutButton}>
          <div className="is-flex is-justify-content-flex-end">
            <Link href="/checkout" className="button is-primary mt-4">Checkout</Link>
          </div>
        </When>
      </div>
    </div>
  )
}