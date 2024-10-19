import httpInstance from '@/lib/axios/axios'
import { CriteriaFormValues } from '@/features/criterias/create-criteria/use-create-criteria'
import {
  GeneralAPIResponse,
  GetAllCriteriasAPIResponse,
  GetCriteriaDetailAPIResponse,
  GetCriteriaTypesAPIResponse
} from '@/models/api/res.model'

class CriteriaService {
  async getAllCriterias() {
    const { data } = await httpInstance.get<GetAllCriteriasAPIResponse>('/criteria/all')
    return data.result
  }

  async getCriteriaTypes() {
    const { data } = await httpInstance.get<GetCriteriaTypesAPIResponse>('/criteria/types')
    return data.result
  }

  async createCriteria(criteria: CriteriaFormValues) {
    const { data } = await httpInstance.post<GeneralAPIResponse>('/criteria/create', criteria)
    return data.message
  }

  async getCriteriaByID(criteriaID: number | undefined) {
    if (!criteriaID) return null
    const { data } = await httpInstance.get<GetCriteriaDetailAPIResponse>(`/criteria/${criteriaID}`)
    return data.result
  }

  async editCriteria({ criteriaID, criteria }: { criteriaID: number; criteria: CriteriaFormValues }) {
    const { data } = await httpInstance.patch<GeneralAPIResponse>(`/criteria/${criteriaID}`, criteria)
    return data.message
  }
}

const criteriaService = new CriteriaService()
export default criteriaService
