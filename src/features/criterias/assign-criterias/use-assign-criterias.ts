import semesterService from '@/services/semester.services'
import { Criteria } from '@/models/criteria.model'
import { assignCriteriasSchema } from '@/models/schemas/criteria.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toaster } from '@/components/ui/toaster'
import { queryClient } from '@/lib/react-query/query.provider'

export type AssignCriteriasFormValues = z.infer<typeof assignCriteriasSchema>

export const useAssignCriterias = (semesterID: number | undefined, criterias: Criteria[] | null | undefined) => {
  const methods = useForm<AssignCriteriasFormValues>({
    resolver: zodResolver(assignCriteriasSchema),
    values: {
      semesterID: String(semesterID) || '',
      criteria: criterias?.map((criteria) => String(criteria.criteriaID)) || []
    }
  })

  const assignCriteriasMutation = useMutation({
    mutationFn: semesterService.assignCriterias,
    onSuccess: (response) => {
      toaster.success({ text: response })
      queryClient.invalidateQueries({ queryKey: ['criterias'] })
      queryClient.invalidateQueries({ queryKey: ['semesterCriterias', semesterID] })
    },
    onError: () => {
      toaster.error({ text: 'Failed to assign criterias' })
    }
  })

  return {
    methods,
    assignCriteriasMutation
  }
}
