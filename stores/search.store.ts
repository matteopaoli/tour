import { StoreApi, UseBoundStore, create } from 'zustand'
import { Search } from '../types'
import { FormEvent } from 'react'

interface SearchState extends Search {
  setDeparture: (from: string) => void
  setDestination: (to: string) => void
  setDepartureDate: (d: Date) => void
  setReturnDate: (d: Date) => void,
  setReturn: (v: boolean) => void,
}

const useSearchStore: UseBoundStore<StoreApi<SearchState>> = create<SearchState>((set) => ({
  from: 'Bangkok train station',
  to: 'Bangkok Suvarnabhumi Airport',
  departureDate: '2023-03-07',
  returnDate: '2023-03-08',
  passengers: 1,
  isReturn: false,
  setDeparture: (from: string) => set(() => ({ from })),
  setDestination: (to: string) => set(() => ({ to })),
  setDepartureDate: (d: Date) => set(() => ({ departureDate: d.toISOString().split('T')[0] })),
  setReturnDate: (d: Date) => set(() => ({ returnDate: d.toISOString().split('T')[0] })),
  setReturn: (v: boolean) => set(() => ({ isReturn: v }))
}))

export default useSearchStore