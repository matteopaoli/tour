import { InsertOneResult } from "mongodb"
import { NextApiResponse } from "next"
import ErrorResponse from "./error-response"
import StatusResponse from "./status-response"

type APIResponse<T> = NextApiResponse<T | ErrorResponse | StatusResponse<T> | InsertOneResult<T>>

export default APIResponse