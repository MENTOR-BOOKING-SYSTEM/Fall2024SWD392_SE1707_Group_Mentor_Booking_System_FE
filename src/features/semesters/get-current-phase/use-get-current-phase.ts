import semesterService from '@/services/semester.services'
import { useAppDispatch } from '@/lib/redux-toolkit/hooks'
import { setPhase } from '@/lib/redux-toolkit/slices/current-phase.slice'
import { useQuery } from '@tanstack/react-query'

export const useGetCurrentPhase = () => {
  const dispatch = useAppDispatch()

  const handleGetCurrentPhase = async () => {
    const phase = await semesterService.getCurrentPhase()
    dispatch(setPhase(phase))
    return phase
  }

  return useQuery({
    queryKey: ['current-phase'],
    queryFn: handleGetCurrentPhase
  })
}
