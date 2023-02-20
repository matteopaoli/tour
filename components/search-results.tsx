import { When } from "react-if"
import useCartStore from "../stores/cart.store"
import { Trip } from "../types"
import SearchResult from "./search-result"
import { useEffect, useMemo, useState } from "react"

interface SearchResultProps {
  trips: Trip[]
}

const SearchResults = ({ trips }: SearchResultProps) => {
  const cart = useCartStore()

  const selectedTrip = useMemo<Trip | null>(() => {
  const result = cart.items.find(obj1 => trips.some(obj2 => obj1._id === obj2._id));
  return result ?? null
  }, [cart.items, trips])

  return (
    <div className="search-results p-4">
      {selectedTrip? 
        <SearchResult trip={selectedTrip} /> 
        : trips.map((trip) => (
          <SearchResult key={trip._id.toString()} trip={trip} />
        ))
      }
    </div>
  )
}

export default SearchResults