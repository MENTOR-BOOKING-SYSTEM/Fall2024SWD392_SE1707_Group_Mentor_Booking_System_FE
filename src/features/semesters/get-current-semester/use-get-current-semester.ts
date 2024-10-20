import semesterService from '@/services/semester.services'
import { useQuery } from '@tanstack/react-query'

export const useGetCurrentSemester = () => {
  return useQuery({
    queryKey: ['current-semester'],
    queryFn: semesterService.getCurrentSemester
  })
}
