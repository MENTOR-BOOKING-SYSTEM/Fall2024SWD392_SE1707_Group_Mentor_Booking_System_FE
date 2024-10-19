import semesterService from '@/services/semester.services'
import { useQuery } from '@tanstack/react-query'

export const useViewSemesterTimestamps = (semesterID: number | undefined) => {
  return useQuery({
    queryKey: ['semesterTimestamps', semesterID],
    queryFn: () => semesterService.getSemesterTimestamps(semesterID)
  })
}
