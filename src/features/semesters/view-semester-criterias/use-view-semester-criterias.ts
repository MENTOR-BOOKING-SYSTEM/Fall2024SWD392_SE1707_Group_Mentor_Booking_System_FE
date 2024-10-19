import semesterService from '@/services/semester.services'
import { useQuery } from '@tanstack/react-query'

export const useViewSemesterCriterias = (semesterID: number | undefined) => {
  return useQuery({
    queryKey: ['semesterCriterias', semesterID],
    queryFn: () => semesterService.getSemesterCriterias(semesterID)
  })
}
