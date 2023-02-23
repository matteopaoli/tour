import useCartStore from "../stores/cart.store"
import { Trip } from "../types"
import SearchResult from "./search-result"
import { useEffect, useMemo } from "react"
import { motion } from 'framer-motion'

interface SearchResultProps {
  trips: Trip[]
  onSelect: (t: Trip | null) => void
}

const SearchResults = ({ trips, onSelect }: SearchResultProps) => {
  const cart = useCartStore()

  const selectedTrip = useMemo<Trip | null>(() => {
  const result = cart.items.find(obj1 => trips.some(obj2 => obj1._id === obj2._id))
  return result ?? null
  }, [cart.items, trips])

  useEffect(() => {
    onSelect(selectedTrip)
  }, [selectedTrip, onSelect])


  return (
    <div className="search-results p-4">
      {selectedTrip? (
        <SearchResult trip={selectedTrip} /> 
      )
        : trips.map((trip) => (
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          key={trip._id as string}
        >
          <SearchResult key={trip._id.toString()} trip={trip} />
          </motion.div>
        ))
      }
    </div>
  )
}

export default SearchResults