export interface LoginAPIResponse {
  message: string
  result: {
    accessToken: string
    refreshToken: string
  }
}
