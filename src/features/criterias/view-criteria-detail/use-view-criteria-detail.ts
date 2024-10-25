import criteriaService from '@/services/criteria.services'
import { useQuery } from '@tanstack/react-query'

export const useViewCriteriaDetail = (criteriaID: number | undefined) => {
  return useQuery({
    queryKey: ['criteria', criteriaID],
    queryFn: () => criteriaService.getCriteriaByID(criteriaID),
    enabled: false
  })
}
