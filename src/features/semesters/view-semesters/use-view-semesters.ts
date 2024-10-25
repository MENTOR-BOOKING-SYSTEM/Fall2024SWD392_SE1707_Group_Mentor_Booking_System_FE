import semesterService from '@/services/semester.services'
import { useQuery } from '@tanstack/react-query'

export const useViewSemesters = () => {
  return useQuery({
    queryKey: ['semesters'],
    queryFn: semesterService.getAllSemesters
  })
}
