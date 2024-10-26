import httpInstance from '@/lib/axios/axios'
import { GetAllTimestampsAPIResponse } from '@/models/api/timestamps/res.model'

class TimestampService {
  async getAllTimestamps() {
    const { data } = await httpInstance.get<GetAllTimestampsAPIResponse>('/timestamps/all')
    return data.result
  }
}

const timestampService = new TimestampService()
export default timestampService
