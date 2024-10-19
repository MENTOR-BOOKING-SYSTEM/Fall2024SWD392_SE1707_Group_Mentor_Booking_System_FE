import semesterService from '@/services/semester.services'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { SemesterFormValues } from '../create-semester/use-create-semester'
import { zodResolver } from '@hookform/resolvers/zod'
import { semesterSchema } from '@/models/schemas/semester.schema'
import { Semester } from '@/models/semester.model'
import { toaster } from '@/components/ui/toaster'
import { queryClient } from '@/lib/react-query/query.provider'
import { formatDBDate } from '@/utils'
import { DATE_FORMAT } from '@/constants'

export const useViewSemesterDetail = (semesterID: number | undefined) => {
  return useQuery({
    queryKey: ['semester', semesterID],
    queryFn: () => semesterService.getSemesterById(semesterID),
    enabled: false
  })
}

export const useEditSemesterDetail = (semester: Semester | null | undefined, onClose: () => void) => {
  const methods = useForm<SemesterFormValues>({
    resolver: zodResolver(semesterSchema),
    values: {
      semesterName: semester?.semesterName || '',
      description: semester?.description || '',
      startDate: formatDBDate({ date: semester?.startDate, formatter: DATE_FORMAT.DATABASE }),
      endDate: formatDBDate({ date: semester?.endDate, formatter: DATE_FORMAT.DATABASE })
    }
  })

  const editSemesterMutation = useMutation({
    mutationFn: semesterService.editSemester,
    onSuccess: (response) => {
      onClose()
      toaster.success({ text: response })
      queryClient.invalidateQueries({ queryKey: ['semesters'] })
    },
    onError: () => {
      toaster.error({ text: 'Failed to edit semester' })
    }
  })

  return { methods, editSemesterMutation }
}
