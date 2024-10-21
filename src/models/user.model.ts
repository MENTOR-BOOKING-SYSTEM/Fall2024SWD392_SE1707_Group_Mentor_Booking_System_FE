export interface UserInfo {
  email: string
  firstName: string
  lastName: string
  avatarUrl: string | null
  groupID: number | null
  projectID: number | null
  position: string | null
}

export interface User {
  userID: number
  username: string
  email: string
  avatarUrl: string | null
  firstName: string
  lastName: string
}
