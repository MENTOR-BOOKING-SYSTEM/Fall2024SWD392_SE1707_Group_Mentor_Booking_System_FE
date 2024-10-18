import criteriaService from '@/services/criteria.services'
import { useQuery } from '@tanstack/react-query'

export const useViewCriterias = () => {
  return useQuery({
    queryKey: ['criterias'],
    queryFn: criteriaService.getAllCriterias
  })
}
