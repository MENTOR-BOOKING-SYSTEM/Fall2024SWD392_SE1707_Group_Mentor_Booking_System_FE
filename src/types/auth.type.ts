export type AuthResponse = {
  message: string
  result: {
    accessToken: string
    refreshToken: string
  }
}

export type RefreshTokenReponse = { result: { access_token: string; refresh_token: string } }
