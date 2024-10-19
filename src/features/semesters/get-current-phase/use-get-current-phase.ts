import semesterService from '@/services/semester.services'
import { useQuery } from '@tanstack/react-query'

export const useGetCurrentPhase = () => {
  return useQuery({
    queryKey: ['current-phase'],
    queryFn: semesterService.getCurrentPhase
  })
}
