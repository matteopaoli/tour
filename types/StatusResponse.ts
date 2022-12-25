type StatusResponse<T> = {
  status?: number
  success?: boolean
  data?: T
}

export default StatusResponse