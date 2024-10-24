import { UserInfo } from '@/models/user.model'
import { useLocalStorage } from 'usehooks-ts'

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useLocalStorage<UserInfo>('userInfo', {
    email: '',
    firstName: '',
    lastName: '',
    avatarUrl: null,
    groupID: null,
    projectID: null,
    position: null
  })

  return {
    userInfo,
    setUserInfo
  }
}
