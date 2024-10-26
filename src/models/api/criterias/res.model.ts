import { Criteria, CriteriaType } from '@/models/criteria.model'

export interface GetAllCriteriasAPIResponse {
  message: string
  result: Criteria[]
}

export interface GetCriteriaTypesAPIResponse {
  message: string
  result: CriteriaType[]
}

export interface GetCriteriaDetailAPIResponse {
  message: string
  result: Criteria
}
