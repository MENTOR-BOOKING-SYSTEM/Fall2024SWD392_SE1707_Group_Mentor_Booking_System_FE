import timestampService from '@/services/timestamp.services'
import { useQuery } from '@tanstack/react-query'

export const useViewTimestamps = () => {
  return useQuery({
    queryKey: ['timestamps'],
    queryFn: timestampService.getAllTimestamps
  })
}
