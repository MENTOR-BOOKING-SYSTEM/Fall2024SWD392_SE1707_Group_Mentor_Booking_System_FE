import techService from '@/services/tech.services'
import { useQuery } from '@tanstack/react-query'

export const useGetAllTechonologies = () => {
  return useQuery({
    queryKey: ['technologies'],
    queryFn: techService.getAllTechs
  })
}
