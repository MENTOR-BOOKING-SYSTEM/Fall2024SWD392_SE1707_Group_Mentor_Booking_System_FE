import semesterService from '@/services/semester.services'
import { toaster } from '@/components/ui/toaster'
import { queryClient } from '@/lib/react-query/query.provider'
import { semesterSchema } from '@/models/schemas/semester.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createGroupSchema } from '@/models/schemas/group.schema'

export type GroupFormValues = z.infer<typeof createGroupSchema>

export function useCreateGroup(onClose: () => void) {
  const methods = useForm<GroupFormValues>({
    resolver: zodResolver(semesterSchema)
  })

  const createSemesterMutation = useMutation({
    mutationFn: semesterService.createSemester,
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['groups'] })
      toaster.success({ text: response })
      onClose()
      methods.reset()
    },
    onError: () => {
      toaster.error({ text: 'OOPs' })
    }
  })

  return { methods, createSemesterMutation }
}
