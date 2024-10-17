import { useMutation, useQueryClient } from '@tanstack/react-query'
import semesterService from '@/services/semester.services'
import { toaster } from '@/components/ui/toaster'
import { Semester } from '@/models/semester.model'

export const useEditSemester = () => {
  const queryClient = useQueryClient()

  const editSemesterMutation = useMutation({
    mutationFn: (updatedSemester: Partial<Semester> & { semesterID: number }) =>
      semesterService.updateSemester(updatedSemester),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['semesters'] })
      toaster.success({ text: 'Update semester success' })
    },
    onError: () => {
      toaster.error({ text: 'Error update semester' })
    }
  })

  return { editSemesterMutation }
}
