import { Trip } from "../types"
import SearchResult from "./search-result"
import { motion } from 'framer-motion'

interface SearchResultProps {
  trips: Trip[]
}

const SearchResults = ({ trips }: SearchResultProps) => {
  return (
    <div className="search-results p-4">
      {trips.map((trip) => (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        key={trip._id as string}
      >
        <SearchResult key={trip._id.toString()} trip={trip} />
        </motion.div>
      ))}
    </div>
  )
}

export default SearchResults