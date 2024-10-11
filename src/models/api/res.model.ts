import { TechnologyModel } from '../ui.model'

export interface LoginAPIResponse {
  message: string
  result: {
    accessToken: string
    refreshToken: string
  }
}

export interface ForgotPwdAPIResponse {
  message: string
}

export interface VerifyCodeAPIResponse {
  message: string
}

export interface ResetPwdAPIResponse {
  message: string
}

export interface GetAllTechsAPIResponse {
  message: string
  result: TechnologyModel[]
}
