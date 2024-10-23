import httpInstance from '@/lib/axios/axios'
import BaseService from './base.services'
import { GetAccountsAPIResponse, GetRolesAPIResponse } from '@/models/api/dashboard/res.model'

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
}

const dashboardService = new DashboardService()
export default dashboardService
