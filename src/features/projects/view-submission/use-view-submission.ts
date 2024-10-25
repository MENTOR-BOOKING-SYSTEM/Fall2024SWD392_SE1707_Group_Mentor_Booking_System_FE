import projectService from '@/services/project.services'
import { useQuery } from '@tanstack/react-query'

export const useViewSubmission = (userID: number | undefined) => {
  return useQuery({
    queryKey: ['view-submission', userID],
    queryFn: projectService.getProjectSubmission
  })
}
