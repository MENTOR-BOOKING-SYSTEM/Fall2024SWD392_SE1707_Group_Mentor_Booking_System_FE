import { UserInfo } from '@/models/user.model'
import { useLocalStorage } from 'usehooks-ts'
import { useAuth } from './use-auth'
import { CurrentPhaseModel } from '@/models/base.model'

export const useUser = () => {
  const { user } = useAuth()

  const [currentUserInfo, setCurrentUserInfo, removecurrentUserInfo] = useLocalStorage<UserInfo>('userInfo', {
    email: '',
    firstName: '',
    lastName: '',
    avatarUrl: null,
    groupID: null,
    projectID: null,
    position: null
  })

  const [currentPhase, setCurrentPhase, removeCurrentPhase] = useLocalStorage<CurrentPhaseModel>('currentPhase', {
    currentPhase: []
  })

  return {
    user,
    currentUserInfo,
    setCurrentUserInfo,
    removecurrentUserInfo,
    currentPhase,
    setCurrentPhase,
    removeCurrentPhase
  }
}
