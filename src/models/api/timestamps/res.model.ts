import { Timestamp } from '@/models/timestamp.model'

export interface GetAllTimestampsAPIResponse {
  message: string
  result: Timestamp[]
}
