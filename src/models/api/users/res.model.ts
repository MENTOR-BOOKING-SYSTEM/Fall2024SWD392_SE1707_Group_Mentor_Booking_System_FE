import { User, UserInfo } from '@/models/user.model'

export interface GetCurrentUserInfoAPIResponse {
  message: string
  result: UserInfo
}

export interface GetGroupMembersAPIResponse {
  message: string
  result: {
    userID: number
    username: string
    email: string
    avatarUrl: string
  }[]
}

export interface GetUsersByRoleAPIResponse {
  message: string
  result: User[]
}
