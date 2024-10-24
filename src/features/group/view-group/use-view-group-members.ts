import { useQuery } from '@tanstack/react-query'
import groupService from '@/services/group.services'

export const useViewGroupMembers = (groupID: number) => {
  return useQuery({
    queryKey: ['group-members', groupID],
    queryFn: () => groupService.getGroupMembers(groupID)
  })
}
