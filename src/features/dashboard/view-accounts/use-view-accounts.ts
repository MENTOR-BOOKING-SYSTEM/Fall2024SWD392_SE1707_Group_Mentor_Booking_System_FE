import dashboardService from '@/services/dashboard.services'
import { useQuery } from '@tanstack/react-query'

export const useViewAccounts = (page: number, limit: number, semesterID: number) => {
  return useQuery({
    queryKey: ['accounts', page, limit, semesterID],
    queryFn: () => dashboardService.getAccounts(page, limit, semesterID),
    enabled: !!semesterID
  })
}
