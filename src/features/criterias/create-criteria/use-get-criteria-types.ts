import criteriaService from '@/services/criteria.services'
import { useQuery } from '@tanstack/react-query'

export const useGetCriteriaTypes = () => {
  return useQuery({
    queryKey: ['criteria', 'types'],
    queryFn: criteriaService.getCriteriaTypes
  })
}
