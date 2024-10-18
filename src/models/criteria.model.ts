export interface Criteria {
  criteriaID: string
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
