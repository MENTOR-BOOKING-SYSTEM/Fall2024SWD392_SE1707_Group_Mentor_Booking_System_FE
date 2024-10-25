import semesterService from '@/services/semester.services'
import { useQuery } from '@tanstack/react-query'

export const useGetCurrentPhase = (userID: number | undefined) => {
  return useQuery({
    queryKey: ['current-phase', userID],
    queryFn: semesterService.getCurrentPhase
  })
}
