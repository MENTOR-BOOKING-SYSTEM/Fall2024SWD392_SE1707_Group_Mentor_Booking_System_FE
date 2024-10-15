import authService from '@/services/auth.services'
import { forgotPasswordSchema } from '@/models/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toaster } from '@/components/ui/toaster'

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export const useForgotPwd = () => {
  const methods = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const forgotPwdMutation = useMutation({
    mutationFn: authService.forgotPwd,
    onSuccess: (response) => {
      toaster.success({
        text: response
      })
      methods.reset()
    },
    onError: () => {
      methods.reset()
      toaster.error({
        text: 'Invalid email'
      })
    }
  })

  return { forgotPwdMutation, methods }
}
