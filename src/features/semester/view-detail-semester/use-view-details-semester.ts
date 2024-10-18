import semesterService from '@/services/semester.services'
import { useQuery } from '@tanstack/react-query'

export const useViewDetailsSemester = (semesterId: number, isOpen: boolean) => {
  return useQuery({
    queryKey: ['semester', semesterId],
    queryFn: () => semesterService.getSemesterById(semesterId),
    enabled: isOpen
  })
}
