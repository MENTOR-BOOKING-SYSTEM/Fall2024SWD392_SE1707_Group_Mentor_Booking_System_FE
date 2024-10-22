import projectService from '@/services/project.services'
import { useQueries } from '@tanstack/react-query'

export const useViewProjectDetail = (projectID: string) => {
  return useQueries({
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
