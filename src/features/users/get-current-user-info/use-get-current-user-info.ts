import userService from '@/services/user.services'
import { useQuery } from '@tanstack/react-query'

export const useGetCurrentUserInfo = (userID: number | undefined) => {
  return useQuery({
    queryKey: ['current-user-info', userID],
    queryFn: userService.getCurrentUserInfo,
    refetchInterval: 1000 * 60 * 30
  })
}
