import { Project } from '@/models/project.model'
import { User } from '@/models/user.model'

export interface GetProjectSubmissionAPIResponse {
  message: string
  result: Project[]
}

export interface GetProjectDetailAPIResponse {
  message: string
  result: {
    project: Project
    attachments: {
      attachmentID: number
      url: string
    }[]
  }
}

export interface GetProjectOwnerAPIResponse {
  message: string
  result: User[]
}

export interface GetProjectTechnologiesAPIResponse {
  message: string
  result: {
    techID: string
    techName: string
    parentID: string | null
  }[]
}
