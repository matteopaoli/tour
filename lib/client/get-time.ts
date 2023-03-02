import { format } from 'date-fns'

export default function getTime(date: Date | string): string {
  return format(new Date(date), 'HH:mm')
} 