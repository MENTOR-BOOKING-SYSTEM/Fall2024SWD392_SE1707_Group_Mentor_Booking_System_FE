import axiosInstance from '@/lib/axios/axios'
import type { ForgotPwdAPIRequest, LoginAPIRequest, ResetPasswordAPIRequest } from '@/models/api/req.model'
import type {
  ForgotPwdAPIResponse,
  LoginAPIResponse,
  LogoutAPIResponse,
  ResetPwdAPIResponse,
  VerifyCodeAPIResponse
} from '@/models/api/res.model'

class AuthService {
  async login({ email, password }: LoginAPIRequest) {
    const { data } = await axiosInstance.post<LoginAPIResponse>('users/login', {
      email,
      password
    })
    return data.result
  }

  async logout(refreshToken: string) {
    await axiosInstance.post<LogoutAPIResponse>('users/logout', { refreshToken })
  }

  async forgotPwd({ email }: ForgotPwdAPIRequest) {
    const { data } = await axiosInstance.post<ForgotPwdAPIResponse>('users/forgot-password', {
      email
    })
    return data.message
  }

  async verifyCode(code: string) {
    const { data } = await axiosInstance.get<VerifyCodeAPIResponse>('users/verify-code', {
      params: {
        code
      }
    })
    return data
  }

  async resetPwd({ forgotPasswordToken, password, confirmPassword }: ResetPasswordAPIRequest) {
    const { data } = await axiosInstance.post<ResetPwdAPIResponse>('users/reset-password', {
      forgotPasswordToken,
      password,
      confirmPassword
    })
    return data
  }
}

const authService = new AuthService()
export default authService
