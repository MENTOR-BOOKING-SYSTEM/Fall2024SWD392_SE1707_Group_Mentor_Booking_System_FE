import userService from '@/services/user.services'
import { useQuery } from '@tanstack/react-query'

export const useGetAllMentors = () => {
  return useQuery({
    queryKey: ['mentors'],
    queryFn: () => userService.getUsersByRole([2])
  })
}
