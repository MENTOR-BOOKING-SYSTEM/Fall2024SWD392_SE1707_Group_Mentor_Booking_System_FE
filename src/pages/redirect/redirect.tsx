import PageLoader from '@/components/shared/page-loader'
import { ROLES } from '@/constants'
import { useGetCurrentPhase } from '@/features/semesters/get-current-phase/use-get-current-phase'
import { useGetCurrentUserInfo } from '@/features/users/get-current-user-info/use-get-current-user-info'
import { useAuth } from '@/hooks/use-auth'
import { UserInfo } from '@/models/user.model'
import { isAllowRoles } from '@/utils'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'

export default function Redirect() {
  const { user } = useAuth()
  const { data: phase, isLoading: isLoadingPhase } = useGetCurrentPhase()
  const { data: userInfo, isLoading: isLoadingInfo } = useGetCurrentUserInfo()
  const [_userInfo, setUserInfo] = useLocalStorage<UserInfo>('userInfo', {
    email: '',
    firstName: '',
    lastName: '',
    avatarUrl: null,
    groupID: null,
    projectID: null,
    position: null
  })

  useEffect(() => {
    if (userInfo) {
      setUserInfo(userInfo)
    }
  }, [userInfo, setUserInfo])

  if (isLoadingPhase || isLoadingInfo) {
    return <PageLoader />
  } else if (phase) {
    if (phase.startsWith('BS')) {
      return <Navigate to='/prepare' replace />
    } else if (phase.startsWith('IS')) {
      if (userInfo?.projectID && !isAllowRoles([ROLES.ADMIN], user)) {
        return <Navigate to={userInfo.projectID + '/boards'} />
      } else if (isAllowRoles([ROLES.ADMIN], user)) {
        return <Navigate to='/dashboard' replace />
      } else {
        return <Navigate to='/404' replace />
      }
    }
  } else {
    return <Navigate to='/404' replace />
  }
}
