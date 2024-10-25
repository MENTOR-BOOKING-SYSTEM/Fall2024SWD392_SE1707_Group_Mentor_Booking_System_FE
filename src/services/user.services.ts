import httpInstance from '@/lib/axios/axios'
import {
  GetCurrentUserInfoAPIResponse,
  GetGroupMembersAPIResponse,
  GetUsersByRoleAPIResponse,
  UploadFilesAPIResponse
} from '@/models/api/users/res.model'

class UserService {
  async getCurrentUserInfo() {
    const { data } = await httpInstance.get<GetCurrentUserInfoAPIResponse>('/users/info')
    return data.result
  }

  async getGroupMembers() {
    const { data } = await httpInstance.get<GetGroupMembersAPIResponse>('/users/same-group-students')
    return data.result
  }

  async getUsersByRole(role: number[]) {
    const { data } = await httpInstance.get<GetUsersByRoleAPIResponse>('/users/role?role=' + `[${role}]`)
    return data.result
  }

  async uploadFiles(formData: FormData) {
    const { data } = await httpInstance.post<UploadFilesAPIResponse>(
      'https://cyperstack.com/medias/upload-image',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )
    return data.result
  }
}

const userService = new UserService()
export default userService
