import userService from '@/services/user.services'
import { useQuery } from '@tanstack/react-query'

export const useGetStudentsByGroup = (userID: string) => {
  return useQuery({
    queryKey: ['group-members', userID],
    queryFn: userService.getGroupMembers
  })
}
