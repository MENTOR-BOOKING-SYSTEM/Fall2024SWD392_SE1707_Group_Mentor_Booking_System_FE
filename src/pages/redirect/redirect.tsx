import PageLoader from '@/components/shared/page-loader'
import { ROLES } from '@/constants'
import { useGetCurrentPhase } from '@/features/semesters/get-current-phase/use-get-current-phase'
import { useGetCurrentUserInfo } from '@/features/users/get-current-user-info/use-get-current-user-info'
import { useAuth } from '@/hooks/use-auth'
import { useUser } from '@/hooks/use-user'
import { PRIVATE_ROUTES } from '@/routes/routes'
import { isAllowRoles } from '@/utils'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

export default function Redirect() {
  const { user } = useAuth()
  const { data: phase, isLoading: isLoadingPhase } = useGetCurrentPhase()
  const { data: userInfo, isLoading: isLoadingInfo } = useGetCurrentUserInfo()
  const { setcurrentUserInfo } = useUser()

  useEffect(() => {
    if (userInfo) {
      setcurrentUserInfo(userInfo)
    }
  }, [userInfo, setcurrentUserInfo])

  if (isLoadingPhase || isLoadingInfo) {
    return <PageLoader />
  } else if (phase) {
    if (isAllowRoles([ROLES.ADMIN], user)) {
      return <Navigate to='/dashboard' replace />
    } else if (phase[0].startsWith('BS')) {
      return <Navigate to={PRIVATE_ROUTES.SUBMISSION.path} replace />
    } else if (phase[0].startsWith('IS')) {
      if (userInfo?.projectID) {
        return <Navigate to={userInfo.projectID + '/boards'} />
      } else {
        return <Navigate to='/404' replace />
      }
    }
  } else {
    return <Navigate to='/404' replace />
  }
}
