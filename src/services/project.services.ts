import axiosInstance from '@/lib/axios/axios'
import { SubmitProjectFormValues } from '@/features/projects/submit-project/use-submit-project'
import { omit } from 'lodash'

class ProjectService {
  async submit(project: SubmitProjectFormValues) {
    const newProject = omit(project, ['collaborators'])
    const { data } = await axiosInstance.post('/projects/submit', newProject)
    return data
  }
}

const projectService = new ProjectService()
export default projectService
