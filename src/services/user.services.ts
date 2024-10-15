import axiosInstance from '@/lib/axios/axios'
import { GetCurrentUserInfoAPIResponse } from '@/models/api/res.model'

class UserService {
  async getCurrentUserInfo() {
    const { data } = await axiosInstance.get<GetCurrentUserInfoAPIResponse>('/users/info')
    return data.result
  }
}

const userService = new UserService()
export default userService
