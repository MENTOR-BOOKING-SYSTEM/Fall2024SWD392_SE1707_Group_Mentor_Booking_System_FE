import projectService from '@/services/project.services'
import { useQuery } from '@tanstack/react-query'

export const useViewSubmission = () => {
  return useQuery({
    queryKey: ['view-submission'],
    queryFn: projectService.getProjectSubmission
  })
}
