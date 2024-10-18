import axiosInstance from '@/lib/axios/axios'
import { SubmitProjectFormValues } from '@/features/projects/submit-project/use-submit-project'

class ProjectService {
  async submit(project: SubmitProjectFormValues) {
    const { data } = await axiosInstance.post('/projects/submit', project)
    return data
  }
}

const projectService = new ProjectService()
export default projectService
