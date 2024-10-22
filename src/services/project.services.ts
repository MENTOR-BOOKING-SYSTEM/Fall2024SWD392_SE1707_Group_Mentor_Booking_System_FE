import httpInstance from '@/lib/axios/axios'
import { SubmitProjectForOthersFormValues } from '@/features/projects/submit-project/submit-project-for-others/use-submit-project'
import {
  GetProjectDetailAPIResponse,
  GetProjectOwnerAPIResponse,
  GetProjectSubmissionAPIResponse,
  GetProjectTechnologiesAPIResponse
} from '@/models/api/res.model'
import { SubmitProjectForMentorFormValues } from '@/features/projects/submit-project/submit-project-for-mentor/use-submit-project'

class ProjectService {
  async submit(project: SubmitProjectForOthersFormValues | SubmitProjectForMentorFormValues) {
    const { data } = await httpInstance.post('/projects/submit', project)
    return data
  }

  async getProjectSubmission() {
    const { data } = await httpInstance.get<GetProjectSubmissionAPIResponse>('/projects/get-submit?page=1&limit=50')
    return data.result
  }

  async getProjectDetail(projectID: string) {
    const { data } = await httpInstance.get<GetProjectDetailAPIResponse>(`/projects/${projectID}/detail`)
    return data.result
  }

  async getProjectOwner(projectID: string) {
    const { data } = await httpInstance.get<GetProjectOwnerAPIResponse>(`/projects/${projectID}/own`)
    return data.result
  }

  async getProjectReviewer(projectID: string) {
    const { data } = await httpInstance.get<GetProjectOwnerAPIResponse>(`/projects/${projectID}/review`)
    return data.result
  }

  async getProjectTechnologies(projectID: string) {
    const { data } = await httpInstance.get<GetProjectTechnologiesAPIResponse>(`/projects/${projectID}/technologies`)
    return data.result
  }
}

const projectService = new ProjectService()
export default projectService
