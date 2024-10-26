import projectService from '@/services/project.services'
import { useSuspenseQueries } from '@tanstack/react-query'

export const useViewProjectDetail = (slug: string) => {
  return useSuspenseQueries({
    queries: [
      {
        queryKey: ['project-detail', slug],
        queryFn: () => projectService.getProjectDetail(slug)
      },
      {
        queryKey: ['project-owner', slug],
        queryFn: () => projectService.getProjectOwner(slug)
      },
      {
        queryKey: ['project-review', slug],
        queryFn: () => projectService.getProjectReviewer(slug)
      },
      {
        queryKey: ['project-technologies', slug],
        queryFn: () => projectService.getProjectTechnologies(slug)
      }
    ]
  })
}
