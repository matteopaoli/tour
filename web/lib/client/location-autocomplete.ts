import { Option } from "../../types"

const locationAutocomplete = (value: string, origin?: string): Promise<Option[]> => {
  const url = `/api/location/autocomplete?location=${value}${origin? `&from=${origin}` : ''}`
  return fetch(url)
    .then((response) => response.json())
    .then((data: string[]) => {
      const options = data.map((suggestion) => ({ label: suggestion, value: suggestion }))
      return options
    })
    .catch((err: string) => { throw new Error(err) })
}

export default locationAutocomplete