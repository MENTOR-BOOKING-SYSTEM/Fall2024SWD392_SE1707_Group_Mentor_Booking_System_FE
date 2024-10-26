import authService from '@/services/auth.services'
import { PRIVATE_ROUTES } from '@/routes/routes'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { toaster } from '@/components/ui/toaster'
import { useForm } from 'react-hook-form'
import { loginSchema } from '@/models/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AuthModel } from '@/models/base.model'
import { useLocalStorage } from 'usehooks-ts'

export type LoginFormValues = z.infer<typeof loginSchema>

export const useLogin = () => {
  const navigate = useNavigate()
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  })
  const [_auth, setAuth] = useLocalStorage<AuthModel>('auth', { accessToken: '', refreshToken: '' })

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (response) => {
      const { accessToken, refreshToken } = response
      navigate(PRIVATE_ROUTES.ROOT.path)
      setAuth({ accessToken, refreshToken })
      methods.reset()
    },
    onError: () => {
      methods.reset({
        email: '',
        password: ''
      })
      toaster.error({
        text: 'Invalid credentials'
      })
    }
  })

  return {
    methods,
    loginMutation
  }
}
