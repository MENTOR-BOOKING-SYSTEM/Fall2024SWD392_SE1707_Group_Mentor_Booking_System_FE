import { Pagination } from '@/models/base.model'
import { Account } from '@/models/user.model'

export interface GetAccountsPagination extends Pagination {
  accounts: Account[]
}

export interface GetAccountsAPIResponse {
  message: string
  result: GetAccountsPagination
}
