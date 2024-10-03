import axiosInstance from '@/lib/axios/axios'
import type { LoginAPIRequest } from '@/models/api/req.model'
import type { LoginAPIResponse } from '@/models/api/res.model'

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
