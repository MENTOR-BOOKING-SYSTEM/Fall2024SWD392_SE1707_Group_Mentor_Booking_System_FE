import semesterService from '@/services/semester.services'
import { useQuery } from '@tanstack/react-query'

export const useGetAllSemesters = () => {
  return useQuery({
    queryKey: ['semesters'],
    queryFn: semesterService.getAllSemesters
  })
}
