import axiosInstance from '@/lib/axios/axios'
import { GetAllTechsAPIResponse } from '@/models/api/res.model'

class TechService {
  async getAllTechs() {
    const { data } = await axiosInstance.get<GetAllTechsAPIResponse>('technologies?page=1&limit=100')
    return data.result
  }
}

const techService = new TechService()
export default techService
