import dashboardService from '@/services/dashboard.services'
import { useQuery } from '@tanstack/react-query'

export const useViewAccountDetail = (semesterID: string, userID: string) => {
  return useQuery({
    queryKey: ['view-account-detail', semesterID, userID],
    queryFn: () => dashboardService.getAccountDetail(semesterID, userID),
    enabled: false
  })
}
