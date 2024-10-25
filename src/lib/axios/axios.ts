import { envConfig } from '@/constants/env'
import { AuthModel } from '@/models/base.model'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from '@/services/auth.services'
import { AuthResponse, RefreshTokenReponse } from '@/types/auth.type'
import { ErrorResponse } from '@/types/utils.type'
import { getAuthFromLS } from '@/utils/auth'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from '@/utils/utils'
import axios, { AxiosError, type AxiosInstance } from 'axios'

// Purchase: 1 - 3
// Me: 2 - 5
// Refresh Token cho purchase: 3 -  4
// Gọi lại Purchase: 4 - 6
// Refresh Token mới cho me: 5 - 6
// Gọi lại Me: 6

export class Http {
  instance: AxiosInstance
  private accessToken: string
  private refreshToken: string
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.accessToken = getAuthFromLS()['accessToken']
    this.refreshToken = getAuthFromLS()['refreshToken']
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: envConfig.BASE_URL,
      timeout: 10000,
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json'
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`
          return config
        }
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config
        if (url === URL_LOGIN || url === URL_REGISTER) {
          const data = response.data as AuthResponse
          this.accessToken = data.result.accessToken
          this.refreshToken = data.result.refreshToken
          const auth: AuthModel = {
            accessToken: this.accessToken,
            refreshToken: this.refreshToken
          }
          localStorage.setItem('auth', JSON.stringify(auth))
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          localStorage.removeItem('auth')
        }
        return response
      },
      (error: AxiosError) => {
        //  401
        if (isAxiosUnauthorizedError<ErrorResponse<{ name: string; message: string }>>(error)) {
          const config = error.response?.config || { headers: {}, url: '' }
          const { url } = config
          if (isAxiosExpiredTokenError(error) && url !== URL_REFRESH_TOKEN) {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  setTimeout(() => {
                    this.refreshTokenRequest = null
                  }, 10000)
                })
            return this.refreshTokenRequest.then((accessToken) => {
              return this.instance({
                ...config,
                headers: { ...config.headers, Authorization: `Bearer ${accessToken}` }
              })
            })
          }
          localStorage.removeItem('auth')
          this.accessToken = ''
          this.refreshToken = ''
        }
        return Promise.reject(error)
      }
    )
  }
  private async handleRefreshToken() {
    try {
      const res = await this.instance.post<RefreshTokenReponse>(URL_REFRESH_TOKEN, {
        refreshToken: this.refreshToken
      })
      const { access_token, refresh_token } = res.data.result
      const auth: AuthModel = {
        accessToken: access_token,
        refreshToken: refresh_token
      }
      localStorage.setItem('auth', JSON.stringify(auth))
      this.accessToken = access_token
      this.refreshToken = refresh_token
      return access_token
    } catch (error) {
      localStorage.removeItem('auth')
      this.accessToken = ''
      this.refreshToken = ''
      throw error
    }
  }
}
const httpInstance = new Http().instance
export default httpInstance
