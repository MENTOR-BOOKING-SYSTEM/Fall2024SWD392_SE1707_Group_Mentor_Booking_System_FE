import dashboardService from '@/services/dashboard.services'
import { useQuery } from '@tanstack/react-query'

export const useViewAccounts = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['accounts', page, limit],
    queryFn: () => dashboardService.getAccounts(page, limit)
  })
}
