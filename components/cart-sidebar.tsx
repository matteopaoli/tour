import { When } from "react-if"
import useCartStore from "../stores/cart.store"
import Link from "next/link"
import CartItem from "./cart-item"
import { useMemo } from "react"

interface CartSidebarProps {
  withCheckoutButton?: boolean
}

export default function CartSidebar({ withCheckoutButton }: CartSidebarProps) {
  const cart = useCartStore()

  const cartTotal = useMemo<number>(() => {
    return cart.items.reduce(( acc, v ) => acc + v.price, 0)
  }, [cart.items])

  return (
    <div className="column is-3">
      <div className="box py-5">
        <h2 className="is-size-3 has-text-weight-bold">Your cart</h2>
        {cart.items.map(item => <CartItem item={item} key={item._id as string} canRemove={withCheckoutButton ?? false} />)}
        <h2 className="is-size-4 has-text-weight-bold is-flex is-justify-content-space-between"><div>Total:</div><div>{cartTotal}฿</div></h2>
        <When condition={withCheckoutButton}>
          <div className="is-flex is-justify-content-flex-end">
            <Link href="/checkout" className="button is-primary mt-4">Checkout</Link>
          </div>
        </When>
      </div>
    </div>
  )
}