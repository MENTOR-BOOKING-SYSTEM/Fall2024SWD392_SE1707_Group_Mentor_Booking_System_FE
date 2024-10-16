import semesterService from '@/services/semester.services'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useGetAllSemesters = () => {
  return useQuery({
    queryKey: ['semesters'],
    queryFn: semesterService.getAllSemesters
  })
}

export const useCreateSemester = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: semesterService.createSemester,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['semesters'] })
    }
  })
}
