import { StoreApi, UseBoundStore, create } from 'zustand'
import { Trip } from '../types'
import { mountStoreDevtool } from 'simple-zustand-devtools'

interface CartState {
  items: Trip[]
  addItem: (t: Trip) => void
  removeItem: (t: Trip) => void
  reset: () => void
}

const useCartStore: UseBoundStore<StoreApi<CartState>> = create<CartState>((set) => ({
  items: [],
  addItem: (t: Trip) => set(state => ({ items: [...state.items, t] })),
  removeItem: (t: Trip) => set(state => {
    const newArr = state.items.filter((item: Trip) => item._id !== t._id )
    return ({ items: newArr })
  }),
  reset: () => set(() => ({ items: [] }))
}))

mountStoreDevtool('CartStore', useCartStore)

export default useCartStore