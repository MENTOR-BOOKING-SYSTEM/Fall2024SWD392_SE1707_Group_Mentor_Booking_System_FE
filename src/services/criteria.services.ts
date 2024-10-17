import httpInstance from '@/lib/axios/axios'
import { GetAllCriteriasAPIResponse } from '@/models/api/res.model'

class CriteriaService {
  async getAllCriterias() {
    const { data } = await httpInstance.get<GetAllCriteriasAPIResponse>('/criteria/all')
    return data.result
  }
}

const criteriaService = new CriteriaService()
export default criteriaService
