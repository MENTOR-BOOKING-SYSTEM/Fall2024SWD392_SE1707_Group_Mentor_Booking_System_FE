import userService from '@/services/user.services'
import { useQuery } from '@tanstack/react-query'

export const useGetCurrentUserInfo = () => {
  return useQuery({
    queryKey: ['current-user-info'],
    queryFn: userService.getCurrentUserInfo,
    refetchInterval: 1000 * 60 * 30
  })
}
