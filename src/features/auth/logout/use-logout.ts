import authService from '@/services/auth.services'
import { toaster } from '@/components/ui/toaster'
import { AuthModel } from '@/models/base.model'
import { PUBLIC_ROUTES } from '@/routes/routes'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'

export const useLogout = () => {
  const navigate = useNavigate()
  const [auth] = useLocalStorage<AuthModel>('auth', { accessToken: '', refreshToken: '' })

  return useMutation({
    mutationFn: () => authService.logout(auth.refreshToken),
    onSuccess: () => {
      toaster.success({
        text: 'Logged out successfully'
      })
      localStorage.clear()
      navigate(PUBLIC_ROUTES.LOGIN)
    },
    onError: () => {
      toaster.error({
        text: 'Failed to logout'
      })
    }
  })
}
