import criteriaService from '@/services/criteria.services'
import { Criteria } from '@/models/criteria.model'
import { CriteriaFormValues } from '../create-criteria/use-create-criteria'
import { criteriaSchema } from '@/models/schemas/criteria.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toaster } from '@/components/ui/toaster'
import { queryClient } from '@/lib/react-query/query.provider'

export const useEditCriteriaDetail = (criteria: Criteria | null | undefined, onClose: () => void) => {
  const methods = useForm<CriteriaFormValues>({
    resolver: zodResolver(criteriaSchema),
    values: {
      name: criteria?.criteriaName || '',
      description: criteria?.description || '',
      type: String(criteria?.type) || ''
    }
  })

  const editCriteriaMutation = useMutation({
    mutationFn: criteriaService.editCriteria,
    onSuccess: (response) => {
      toaster.success({ text: response })
      onClose()
      queryClient.invalidateQueries({ queryKey: ['criterias'] })
    },
    onError: () => {
      toaster.error({ text: 'Failed to edit criteria' })
    }
  })

  return { methods, editCriteriaMutation }
}
