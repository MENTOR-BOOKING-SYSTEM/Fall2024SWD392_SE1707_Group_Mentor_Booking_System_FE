import authService from '@/services/auth.services'
import { useQuery } from '@tanstack/react-query'

export const useVerifyCode = (code: string) => {
  return useQuery({
    queryKey: ['verify-code', code],
    queryFn: () => authService.verifyCode(code)
  })
}
