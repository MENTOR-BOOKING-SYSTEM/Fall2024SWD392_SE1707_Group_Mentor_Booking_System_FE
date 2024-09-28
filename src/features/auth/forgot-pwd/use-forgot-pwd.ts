import { forgotPasswordSchema } from '@/models/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export const useForgotPwd = () => {
  const methods = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema)
  })

  const forgotPwdMutation = useMutation({})

  return { forgotPwdMutation, methods }
}
