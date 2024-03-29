import { StoreApi, UseBoundStore, create } from 'zustand'
import { Search } from '../types'
import { mountStoreDevtool } from 'simple-zustand-devtools'

interface SearchState extends Search {
  setDeparture: (from: string) => void
  setDestination: (to: string) => void
  setDepartureDate: (d: Date) => void
  setReturnDate: (d: Date) => void,
  setReturn: (v: boolean) => void,
  setLastSearch: (v: Search) => void,
  lastSearch: Search | null
}

const useSearchStore: UseBoundStore<StoreApi<SearchState>> = create<SearchState>((set) => ({
  from: 'Bangkok train station',
  to: 'Bangkok Suvarnabhumi Airport',
  departureDate: '2023-03-07',
  returnDate: '2023-03-08',
  passengers: 1,
  isReturn: false,
  lastSearch: null,
  setLastSearch: (lastSearch: Search) => set(() => ({ lastSearch })),
  setDeparture: (from: string) => set(() => ({ from })),
  setDestination: (to: string) => set(() => ({ to })),
  setDepartureDate: (d: Date) => set(() => ({ departureDate: d.toISOString().split('T')[0] })),
  setReturnDate: (d: Date) => set(() => ({ returnDate: d.toISOString().split('T')[0] })),
  setReturn: (v: boolean) => set(() => ({ isReturn: v }))
}))

mountStoreDevtool('SearchStore', useSearchStore)

export default useSearchStore