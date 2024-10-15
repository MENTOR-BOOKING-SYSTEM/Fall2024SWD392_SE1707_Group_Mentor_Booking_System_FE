import axios, { AxiosError, AxiosResponse, type AxiosInstance } from 'axios'

import { toast } from 'react-toastify'


import HttpStatusCode from '@/constants/httpStatusCode.enum'
import { clearLS, getAccessTokenFromLS, getRefreshTokenFromLS, setAccessTokenToLS, setRefreshTokenToLS } from '@/utils/auth'
import config from '@/constants/config'
import { URL_LOGIN, URL_LOGOUT, URL_REFRESH_TOKEN, URL_REGISTER } from '@/services/auth.services'
import { AuthResponse, RefreshTokenReponse } from '@/types/auth.type'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from '@/utils/utils'
import { ErrorResponse } from '@/types/utils.type'

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
    this.accessToken = getAccessTokenFromLS()
    this.refreshToken = getRefreshTokenFromLS()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
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
          setAccessTokenToLS(this.accessToken)
          setRefreshTokenToLS(this.refreshToken)
        } else if (url === URL_LOGOUT) {
          this.accessToken = ''
          this.refreshToken = ''
          clearLS()
        }
        return response
      },
      (error: AxiosError) => {
        if (
          ![HttpStatusCode.UnprocessableEntity, HttpStatusCode.Unauthorized].includes(error.response?.status as number)
        ) {
          const data: any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }

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
            return this.refreshTokenRequest.then((access_token) => {
              return this.instance({ ...config, headers: { ...config.headers, Authorization: `Bearer ${access_token}` } })
            })
          }

          clearLS()
          this.accessToken = ''
          this.refreshToken = ''
          toast.error(error.response?.data.data?.message || error.response?.data.message)
        }
        return Promise.reject(error)
      }
    )
  }
  private async handleRefreshToken() {
    try {
      const res = await this.instance.post<RefreshTokenReponse>(URL_REFRESH_TOKEN, {
        refreshToken: this.refreshToken
      });
      const { access_token, refresh_token } = res.data.result;
      setAccessTokenToLS(access_token);
      setRefreshTokenToLS(refresh_token);
      this.accessToken = access_token;
      this.refreshToken = refresh_token;
      return access_token;
    } catch (error) {
      clearLS();
      this.accessToken = '';
      this.refreshToken = '';
      throw error;
    }
  }

}
const http = new Http().instance
export default http
