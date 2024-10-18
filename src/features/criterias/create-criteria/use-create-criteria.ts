import criteriaService from '@/services/criteria.services'
import { createCriteriaSchema } from '@/models/schemas/criteria.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toaster } from '@/components/ui/toaster'
import { queryClient } from '@/lib/react-query/query.provider'

export type CreateCriteriaFormValues = z.infer<typeof createCriteriaSchema>

export const useCreateCriteria = (onClose: () => void) => {
  const methods = useForm<CreateCriteriaFormValues>({
    resolver: zodResolver(createCriteriaSchema),
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
