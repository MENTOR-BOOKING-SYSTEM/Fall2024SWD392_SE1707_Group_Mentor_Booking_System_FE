import { Criteria } from '@/models/criteria.model'
import { Semester } from '@/models/semester.model'
import { SemesterTimestamp } from '@/models/timestamp.model'

export interface GetAllSemestersResponse {
  message: string
  result: Semester[]
}

export interface GetCurrentPhaseAPIResponse {
  message: string
  result: string[]
}

export interface CreateSemesterAPIResponse {
  message: string
}

export interface GetSemesterDetailAPIResponse {
  message: string
  result: Semester
}

export interface GetSemesterTimestampsAPIResponse {
  message: string
  result: SemesterTimestamp[]
}

export interface GetSemesterCriteriasAPIResponse {
  message: string
  result: Criteria[]
}
