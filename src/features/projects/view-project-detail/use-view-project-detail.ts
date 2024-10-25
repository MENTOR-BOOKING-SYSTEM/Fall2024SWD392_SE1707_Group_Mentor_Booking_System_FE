import projectService from '@/services/project.services'
import { useSuspenseQueries } from '@tanstack/react-query'

export const useViewProjectDetail = (projectID: string) => {
  return useSuspenseQueries({
    queries: [
      {
        queryKey: ['project-detail', projectID],
        queryFn: () => projectService.getProjectDetail(projectID)
      },
      {
        queryKey: ['project-owner', projectID],
        queryFn: () => projectService.getProjectOwner(projectID)
      },
      {
        queryKey: ['project-review', projectID],
        queryFn: () => projectService.getProjectReviewer(projectID)
      },
      {
        queryKey: ['project-technologies', projectID],
        queryFn: () => projectService.getProjectTechnologies(projectID)
      }
    ]
  })
}
