import { Trip } from "../types"
import SearchResult from "./search-result"

interface SearchResultProps {
  trips: Trip[]
}

const SearchResults = ({ trips }: SearchResultProps) => (
  <div className="search-results">
    {trips.map((trip) => (
      <SearchResult key={trip._id.toString()} trip={trip} />
    ))}
  </div>
)

export default SearchResults