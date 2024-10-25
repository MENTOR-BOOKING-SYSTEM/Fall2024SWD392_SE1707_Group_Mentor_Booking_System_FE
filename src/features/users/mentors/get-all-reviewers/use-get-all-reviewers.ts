import userService from '@/services/user.services'
import { useQuery } from '@tanstack/react-query'

export const useGetAllReviewers = () => {
  return useQuery({
    queryKey: ['reviewers'],
    queryFn: () => userService.getUsersByRole([2, 4, 5])
  })
}
