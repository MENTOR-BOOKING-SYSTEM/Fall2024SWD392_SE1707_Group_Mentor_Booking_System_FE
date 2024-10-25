import { UserInfo } from '@/models/user.model'
import { useLocalStorage } from 'usehooks-ts'
import { useAuth } from './use-auth'

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
    position: null
  })

  return {
    user,
    currentUserInfo,
    setcurrentUserInfo,
    removecurrentUserInfo
  }
}
