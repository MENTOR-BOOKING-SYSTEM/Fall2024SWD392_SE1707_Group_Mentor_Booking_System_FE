import httpInstance from '@/lib/axios/axios'
import { SubmitProjectFormValues } from '@/features/projects/submit-project/submit-project-for-others/use-submit-project'
import { GetProjectSubmissionAPIResponse } from '@/models/api/res.model'

class ProjectService {
  async submit(project: SubmitProjectFormValues) {
    const { data } = await httpInstance.post('/projects/submit', project)
    return data
  }

  async getProjectSubmission() {
    const { data } = await httpInstance.get<GetProjectSubmissionAPIResponse>('/projects/get-submit?page=1&limit=50')
    return data.result
  }
}

const projectService = new ProjectService()
export default projectService
