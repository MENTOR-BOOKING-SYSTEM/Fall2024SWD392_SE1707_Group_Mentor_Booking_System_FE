import { Pagination } from '@/models/base.model'
import { Account } from '@/models/user.model'

export interface GetAccountsPagination extends Pagination {
  accounts: Account[]
}

export interface GetAccountsAPIResponse {
  message: string
  result: GetAccountsPagination
}

export interface GetRolesAPIResponse {
  message: string
  result: {
    roleID: number
    roleName: string
  }[]
}

export interface GetAccountDetailAPIResponse {
  message: string
  result: Account
}
