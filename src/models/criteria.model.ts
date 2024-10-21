export interface Criteria {
  criteriaID: number
  type: string
  criteriaName: string
  description: string
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}

export interface CriteriaType {
  criteriaTypeID: string
  type: string
}
