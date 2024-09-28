import { z } from 'zod'

export const loginSchema = z.object({
  email: z
    .string()
    .refine((val) => val.length !== 0, {
      message: 'Identifier is required'
    })
    .refine((val) => val.length >= 4 && val.length <= 50, {
      message: 'Identifier must be between 4 and 50 characters'
    }),
  password: z
    .string()
    .refine((val) => val.length !== 0, {
      message: 'Password is required'
    })
    .refine((val) => val.length >= 8 && val.length <= 50, {
      message: 'Password must be between 8 and 50 characters'
    })
})

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Email is invalid' })
})

export const otpSchema = z.object({
  otp: z.string().length(6, { message: 'OTP must be in 6 characters' })
})
