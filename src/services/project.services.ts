import httpInstance from '@/lib/axios/axios'
import { SubmitProjectForOthersFormValues } from '@/features/projects/submit-project/submit-project-for-others/use-submit-project'
import { SubmitProjectForMentorFormValues } from '@/features/projects/submit-project/submit-project-for-mentor/use-submit-project'
import {
  GetProjectDetailAPIResponse,
  GetProjectOwnerAPIResponse,
  GetProjectSubmissionAPIResponse,
  GetProjectTechnologiesAPIResponse
} from '@/models/api/projects/res.model'

class ProjectService {
  async submit(project: SubmitProjectForOthersFormValues | SubmitProjectForMentorFormValues) {
    const { data } = await httpInstance.post('/projects/submit', project)
    return data
  }

  async getProjectSubmission() {
    const { data } = await httpInstance.get<GetProjectSubmissionAPIResponse>('/projects/get-submit?page=1&limit=10')
    return data.result
  }

  async getProjectDetail(slug: string) {
    const { data } = await httpInstance.get<GetProjectDetailAPIResponse>(`/projects/${slug}/detail`)
    return data.result
  }

  async getProjectOwner(slug: string) {
    const { data } = await httpInstance.get<GetProjectOwnerAPIResponse>(`/projects/owners/${slug}`)
    return data.result
  }

  async getProjectReviewer(slug: string) {
    const { data } = await httpInstance.get<GetProjectOwnerAPIResponse>(`/projects/reviewers/${slug}`)
    return data.result
  }

  async getProjectTechnologies(slug: string) {
    const { data } = await httpInstance.get<GetProjectTechnologiesAPIResponse>(`/projects/technologies/${slug}`)
    return data.result
  }
}

const projectService = new ProjectService()
export default projectService
