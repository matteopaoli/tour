import { InsertOneResult } from "mongodb"
import { NextApiRequest, NextApiResponse } from "next"
import ErrorResponse from "./ErrorResponse"
import StatusResponse from "./StatusResponse"

type APIResponse<T> = NextApiResponse<T | ErrorResponse | StatusResponse<T> | InsertOneResult<T>>

export default APIResponse