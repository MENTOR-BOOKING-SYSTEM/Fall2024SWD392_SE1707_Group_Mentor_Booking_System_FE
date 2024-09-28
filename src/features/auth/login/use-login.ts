import authService from '@/services/auth.services'
import { PRIVATE_ROUTES } from '@/routes/routes'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toaster } from '@/components/ui/toaster'
import { useForm } from 'react-hook-form'
import { loginSchema } from '@/models/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

export type LoginFormValues = z.infer<typeof loginSchema>

export const useLogin = () => {
  const navigate = useNavigate()
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: () => {
      navigate(PRIVATE_ROUTES.ROOT)
      methods.reset()
    },
    onError: () => {
      toaster.error({ title: 'Error', text: 'Invalid credentials' })
      methods.reset()
      methods.setError('password', { type: 'manual', message: 'Invalid credentials' })
    }
  })

  return {
    methods,
    loginMutation
  }
}
