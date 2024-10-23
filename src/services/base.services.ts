import httpInstance from '@/lib/axios/axios'

interface PaginationParams {
  page: number
  limit: number
}

class BaseService {
  protected async getWithPagination<T>(url: string, params: PaginationParams): Promise<T> {
    const { data } = await httpInstance.get<T>(url, { params })
    return data
  }
}

export default BaseService
