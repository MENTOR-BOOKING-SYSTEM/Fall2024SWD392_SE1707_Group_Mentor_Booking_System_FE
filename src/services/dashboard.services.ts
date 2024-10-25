import BaseService from './base.services'
import { GetAccountsAPIResponse } from '@/models/api/dashboard/res.model'

class DashboardService extends BaseService {
  async getAccounts(page: number, limit: number) {
    const data = await this.getWithPagination<GetAccountsAPIResponse>('/dashboard/accounts', { page, limit })
    return data.result
  }
}

const dashboardService = new DashboardService()
export default dashboardService
