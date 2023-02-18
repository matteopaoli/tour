import { FormEvent } from "react" 
import { useRouter } from "next/router"
import useSearchStore from "../stores/search.store"

export default function useSubmitSearch(): (e: FormEvent<HTMLFormElement>) => void {
  const search = useSearchStore()
  const router = useRouter()

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { from, to, departureDate } = search
    if ([from, to, departureDate].every(Boolean)) {
      const qs = new URLSearchParams({ departure: from,destination: to,departureDate }).toString()
      const url = '/trips?' + qs
      void router.push(url)
    }
  }

  return submit
}
