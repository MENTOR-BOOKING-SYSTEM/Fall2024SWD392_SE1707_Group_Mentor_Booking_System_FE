import httpInstance from '@/lib/axios/axios'
import { CreateCriteriaFormValues } from '@/features/criterias/create-criteria/use-create-criteria'
import { GeneralAPIResponse, GetAllCriteriasAPIResponse, GetCriteriaTypesAPIResponse } from '@/models/api/res.model'

class CriteriaService {
  async getAllCriterias() {
    const { data } = await httpInstance.get<GetAllCriteriasAPIResponse>('/criteria/all')
    return data.result
  }

  async getCriteriaTypes() {
    const { data } = await httpInstance.get<GetCriteriaTypesAPIResponse>('/criteria/types')
    return data.result
  }

  async createCriteria(criteria: CreateCriteriaFormValues) {
    const { data } = await httpInstance.post<GeneralAPIResponse>('/criteria', criteria)
    return data.message
  }
}

const criteriaService = new CriteriaService()
export default criteriaService
