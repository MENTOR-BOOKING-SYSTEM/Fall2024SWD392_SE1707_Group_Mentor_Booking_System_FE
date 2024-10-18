import { Criteria, CriteriaType } from '../criteria.model'
import { Semester } from '../semester.model'
import { User, UserInfo } from '../user.model'

export interface LoginAPIResponse {
  message: string
  result: {
    accessToken: string
    refreshToken: string
  }
}

export interface GeneralAPIResponse {
  message: string
}

export interface GetAllTechsAPIResponse {
  message: string
  result: {
    techID: string
    techName: string
    parentID: string | null
  }[]
}

export interface GetAllSemestersResponse {
  message: string
  result: Semester[]
}
export interface GetCurrentPhaseAPIResponse {
  message: string
  result: string
}

export interface GetCurrentUserInfoAPIResponse {
  message: string
  result: UserInfo
}

export interface CreateSemesterAPIResponse {
  message: string
}

export interface GetGroupMembersAPIResponse {
  message: string
  result: {
    userID: number
    username: string
    email: string
    avatarUrl: string
  }[]
}

export interface GetAllCriteriasAPIResponse {
  message: string
  result: Criteria[]
}

export interface GetUsersByRoleAPIResponse {
  message: string
  result: User[]
}

export interface GetCriteriaTypesAPIResponse {
  message: string
  result: CriteriaType[]
}
