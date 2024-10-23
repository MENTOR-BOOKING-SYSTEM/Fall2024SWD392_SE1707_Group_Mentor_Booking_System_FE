import httpInstance from '@/lib/axios/axios'
import { GetAllTechsAPIResponse } from '@/models/api/technologies/res.model'

class TechService {
  async getAllTechs() {
    const { data } = await httpInstance.get<GetAllTechsAPIResponse>('technologies?page=1&limit=100')
    return data.result
  }
}

const techService = new TechService()
export default techService
