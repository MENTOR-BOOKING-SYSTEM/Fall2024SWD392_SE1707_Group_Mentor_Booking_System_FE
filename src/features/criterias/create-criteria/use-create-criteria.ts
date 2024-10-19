import criteriaService from '@/services/criteria.services'
import { criteriaSchema } from '@/models/schemas/criteria.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toaster } from '@/components/ui/toaster'
import { queryClient } from '@/lib/react-query/query.provider'

export type CriteriaFormValues = z.infer<typeof criteriaSchema>

export const useCreateCriteria = (onClose: () => void) => {
  const methods = useForm<CriteriaFormValues>({
    resolver: zodResolver(criteriaSchema),
    defaultValues: {
      type: '1'
    }
  })

  const createCriteriaMutation = useMutation({
    mutationFn: criteriaService.createCriteria,
    onSuccess: (response) => {
      toaster.success({ text: response })
      queryClient.invalidateQueries({ queryKey: ['criterias'] })
      methods.reset()
      onClose()
    },
    onError: (error) => {
      toaster.error({ text: error.message })
    }
  })

  return { methods, createCriteriaMutation }
}
