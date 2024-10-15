import axiosInstance from '@/lib/axios/axios'
import type { LoginAPIRequest } from '@/models/api/req.model'
import type { LoginAPIResponse } from '@/models/api/res.model'
export const URL_LOGIN = 'users/login'
export const URL_REGISTER = 'users/register'
export const URL_LOGOUT = 'users/logout'
export const URL_REFRESH_TOKEN = 'users/refresh-token'
class AuthService {
  async login({ email, password }: LoginAPIRequest) {
    const response = await axiosInstance.post<LoginAPIResponse>('users/login', {
      email,
      password
    })
    return response.data.result
  }
}

const authService = new AuthService()
export default authService
