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
  result: {
    techID: string
    techName: string
    parentID: string | null
  }[]
}
