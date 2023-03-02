import { useRouter } from "next/router"
import { format } from 'date-fns'

export default function useSubmitSearch(): (departure: string, destination: string, date: string, quantity: number) => void {
  const router = useRouter()

  const submit = (departure: string, destination: string, date: string, quantity: number) => {
    if ([departure, destination, quantity].every(Boolean)) {
      const qs = new URLSearchParams({ 
        departure,
        destination,
        date,
        quantity: quantity.toString() 
      }).toString()

      const url = '/trips?' + qs
      void router.push(url)
    }
  }

  return submit
}
