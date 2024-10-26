import { UserInfo } from '@/models/user.model'
import { useLocalStorage } from 'usehooks-ts'
import { useAuth } from './use-auth'
import { CurrentPhaseModel } from '@/models/base.model'

export const useUser = () => {
  const { user } = useAuth()
  const [currentUserInfo, setcurrentUserInfo, removecurrentUserInfo] = useLocalStorage<UserInfo>('userInfo', {
    userID: 0,
    email: '',
    firstName: '',
    lastName: '',
    avatarUrl: null,
    groupID: null,
    projectID: null,
    position: ''
  })

  const [currentPhase, setCurrentPhase, removeCurrentPhase] = useLocalStorage<CurrentPhaseModel>('currentPhase', {
    currentPhase: []
  })

  const updateUserInfo = (newInfo: Partial<UserInfo>) => {
    setcurrentUserInfo((prevInfo) => ({
      ...prevInfo,
      ...newInfo
    }))
  }

  return {
    user,
    currentUserInfo,
    setcurrentUserInfo,
    updateUserInfo,
    removecurrentUserInfo,
    currentPhase,
    setCurrentPhase,
    removeCurrentPhase
  }
}
