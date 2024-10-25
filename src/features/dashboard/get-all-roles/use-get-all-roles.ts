import dashboardService from '@/services/dashboard.services'
import { useQuery } from '@tanstack/react-query'

export const useGetAllRoles = () => {
  return useQuery({
    queryKey: ['roles'],
    queryFn: dashboardService.getRoles
  })
}
