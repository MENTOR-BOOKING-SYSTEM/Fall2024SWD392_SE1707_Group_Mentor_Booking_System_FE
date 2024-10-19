import httpInstance from '@/lib/axios/axios'
import { GetAllTimestampsResponse } from '@/models/api/res.model'

class TimestampService {
  async getAllTimestamps() {
    const { data } = await httpInstance.get<GetAllTimestampsResponse>('/timestamps/all')
    return data.result
  }
}

const timestampService = new TimestampService()
export default timestampService
