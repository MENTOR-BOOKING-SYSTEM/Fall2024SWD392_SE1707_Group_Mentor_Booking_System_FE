export interface LoginAPIResponse {
  message: string
  result: {
    accessToken: string
    refreshToken: string
  }
}

export interface LogoutAPIResponse {
  message: string
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

export interface GetAllSemestersResponse {
  message: string
  result: {
    semesterID: string
    semesterName: string
    startDate: string
    endDate: string
    desc: string
  }[]
}

export interface CreateSemestersResponse {
  message: string
  result: {
    semesterID: string
    semesterName: string
    startDate: string
    endDate: string
    desc: string
  }[]
}
