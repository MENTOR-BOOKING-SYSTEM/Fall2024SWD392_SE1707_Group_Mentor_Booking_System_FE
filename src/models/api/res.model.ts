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
