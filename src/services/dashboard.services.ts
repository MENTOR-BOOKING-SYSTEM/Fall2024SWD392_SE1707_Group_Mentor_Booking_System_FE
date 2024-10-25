import httpInstance from '@/lib/axios/axios'
import BaseService from './base.services'
import {
  GetAccountDetailAPIResponse,
  GetAccountsAPIResponse,
  GetRolesAPIResponse
} from '@/models/api/dashboard/res.model'
import { CreateAccountFormValues } from '@/features/dashboard/create-account/use-create-account'
import { GeneralAPIResponse } from '@/models/base.model'
import { EditAccountDetailFormValues } from '@/features/dashboard/edit-account-detail/use-edit-account-detail'

class DashboardService extends BaseService {
  async getAccounts(page: number, limit: number, semesterID: number) {
    const data = await this.getWithPagination<GetAccountsAPIResponse>(`/dashboard/accounts/${semesterID}`, {
      page,
      limit
    })
    return data.result
  }

  async getRoles() {
    const { data } = await httpInstance.get<GetRolesAPIResponse>('/dashboard/accounts/roles')
    return data.result
  }

  async createAccount({ account, semesterID }: { account: CreateAccountFormValues; semesterID: number | undefined }) {
    const { data } = await httpInstance.post<GeneralAPIResponse>(`/dashboard/accounts/${semesterID}/create`, account)
    return data.message
  }

  async getAccountDetail(semesterID: string, userID: string) {
    const { data } = await httpInstance.get<GetAccountDetailAPIResponse>(
      `/dashboard/accounts/${userID}/${semesterID}/detail`
    )
    return data.result
  }

  async editAccountDetail({
    account,
    semesterID,
    userID
  }: {
    account: EditAccountDetailFormValues
    semesterID: number | undefined
    userID: string
  }) {
    const { data } = await httpInstance.patch<GeneralAPIResponse>(
      `/dashboard/accounts/${userID}/${semesterID}/edit`,
      account
    )
    return data.message
  }
}

const dashboardService = new DashboardService()
export default dashboardService
