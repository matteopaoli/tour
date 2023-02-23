import { FormEvent } from "react" 
import { useRouter } from "next/router"
import useSearchStore from "../stores/search.store"

export default function useSubmitSearch(): (e: FormEvent<HTMLFormElement>) => void {
  const search = useSearchStore()
  const router = useRouter()

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { from, to, departureDate, returnDate, isReturn } = search
    let qs: string
    if (isReturn) {
      if ([from, to, departureDate, returnDate].every(Boolean)) {
        qs = new URLSearchParams({ departure: from, destination: to, departureDate, returnDate, isReturn: isReturn.toString() }).toString()
        const url = '/trips?' + qs
        void router.push(url)
      }
    }
    else {
      if ([from, to, departureDate].every(Boolean)) {
        qs = new URLSearchParams({ departure: from, destination: to, departureDate, isReturn: isReturn.toString() }).toString()
        const url = '/trips?' + qs
        void router.push(url)
      }
    }
  }

  return submit
}
