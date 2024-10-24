import dashboardService from '@/services/dashboard.services'
import { createAccountSchema } from '@/models/schemas/account.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toaster } from '@/components/ui/toaster'
import { queryClient } from '@/lib/react-query/query.provider'
import { useState } from 'react'

export type CreateAccountFormValues = z.infer<typeof createAccountSchema>

export const useCreateAccount = (
  page: number,
  semesterID: number | undefined,
  onClose: () => void,
  limit: number = 10
) => {
  const [avatar, setAvatar] = useState('')

  const methods = useForm<CreateAccountFormValues>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      avatarUrl: '',
      firstName: '',
      lastName: ''
    }
  })

  const createAccountMutation = useMutation({
    mutationFn: dashboardService.createAccount,
    onSuccess: (response) => {
      methods.reset()
      toaster.success({ text: response })
      onClose()
      setAvatar('')
      queryClient.invalidateQueries({ queryKey: ['accounts', page, limit, semesterID] })
    },
    onError: () => {
      toaster.error({ text: 'Failed to create account' })
    }
  })

  return { methods, createAccountMutation, avatar, setAvatar }
}
