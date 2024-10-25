export interface LoginAPIRequest {
  email: string
  password: string
}

export interface ForgotPwdAPIRequest {
  email: string
}

export interface ResetPasswordAPIRequest {
  forgotPasswordToken: string
  password: string
  confirmPassword: string
}
