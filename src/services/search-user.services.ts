import httpInstance from '@/lib/axios/axios'

export interface SearchUserResult {
  userID: number
  email: string
  username: string
  firstName: string
  lastName: string
  avatarUrl: string | null
  roles: string[]
}

interface SearchUserResponse {
  result: SearchUserResult[]
}

class SearchUserService {
  async searchUsers(role: number[], isExact: boolean, email: string, group: boolean) {
    const { data } = await httpInstance.get<SearchUserResponse>(
      `/users/filter?role=[${role}]&isExact=${isExact}&email=${email}&group=${group}`
    )
    return data.result
  }
}

const searchUserService = new SearchUserService()
export default searchUserService
