import httpInstance from '@/lib/axios/axios'
import { LoginAPIResponse } from '@/models/api/auth/res.model'
import { GeneralAPIResponse } from '@/models/base.model'
import type { ForgotPwdAPIRequest, LoginAPIRequest, ResetPasswordAPIRequest } from '@/models/api/auth/req.model'

export const URL_LOGIN = 'users/login'
export const URL_REGISTER = 'users/register'
export const URL_LOGOUT = 'users/logout'
export const URL_REFRESH_TOKEN = 'users/refresh-token'

class AuthService {
  async login({ email, password }: LoginAPIRequest) {
    const { data } = await httpInstance.post<LoginAPIResponse>('users/login', {
      email,
      password
    })
    return data.result
  }

  async logout(refreshToken: string) {
    await httpInstance.post<GeneralAPIResponse>('users/logout', { refreshToken })
  }

  async forgotPwd({ email }: ForgotPwdAPIRequest) {
    const { data } = await httpInstance.post<GeneralAPIResponse>('users/forgot-password', {
      email
    })
    return data.message
  }

  async verifyCode(code: string) {
    const { data } = await httpInstance.get<GeneralAPIResponse>('users/verify-code', {
      params: {
        code
      }
    })
    return data.message
  }

  async resetPwd({ forgotPasswordToken, password, confirmPassword }: ResetPasswordAPIRequest) {
    const { data } = await httpInstance.post<GeneralAPIResponse>('users/reset-password', {
      forgotPasswordToken,
      password,
      confirmPassword
    })
    return data
  }
}

const authService = new AuthService()
export default authService
