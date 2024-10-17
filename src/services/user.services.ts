import httpInstance from '@/lib/axios/axios'
import { GetCurrentUserInfoAPIResponse, GetGroupMembersAPIResponse } from '@/models/api/res.model'

class UserService {
  async getCurrentUserInfo() {
    const { data } = await httpInstance.get<GetCurrentUserInfoAPIResponse>('/users/info')
    return data.result
  }

  async getGroupMembers() {
    const { data } = await httpInstance.get<GetGroupMembersAPIResponse>('/users/same-group-students')
    return data.result
  }
}

const userService = new UserService()
export default userService
