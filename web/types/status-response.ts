export default interface StatusResponse<T> {
  status?: number
  success?: boolean
  data?: T
}
