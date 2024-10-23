import { createAccountSchema } from '@/models/schemas/account.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type CreateAccountFormValues = z.infer<typeof createAccountSchema>

export const useCreateAccount = () => {
  const methods = useForm<CreateAccountFormValues>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      avatarUrl: '',
      firstName: '',
      lastName: ''
    }
  })

  const createAccountMutation = useMutation({})

  return { methods, createAccountMutation }
}
