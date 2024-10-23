import { Project } from '@/models/project.model'

export interface GetProjectSubmissionAPIResponse {
  message: string
  result: Project[]
}
