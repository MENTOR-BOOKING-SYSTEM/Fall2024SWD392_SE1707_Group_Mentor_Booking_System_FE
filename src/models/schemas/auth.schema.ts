import { validatePasswordStrength } from '@/utils'
import { z } from 'zod'

export type PasswordSchema = {
  password: string
  confirmPassword: string
}

const passwordMatchRefinement = (schema: PasswordSchema, ctx: z.RefinementCtx) => {
  if (schema.password !== schema.confirmPassword) {
    ctx.addIssue({
      code: 'custom',
      message: 'mismatch_password',
      path: ['confirmPassword']
    })
  }
}

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
    .refine((val) => val.length >= 6 && val.length <= 50, {
      message: 'Password must be between 6 and 50 characters'
    })
})

export const passwordsSchema = z
  .object({
    password: z
      .string()
      .refine((val) => val.length !== 0, {
        message: 'Password is required'
      })
      .refine((val) => val.length >= 6 && val.length <= 50, {
        message: 'Password must be between 6 and 50 characters'
      })
      .refine((val) => validatePasswordStrength(val), {
        message:
          'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
      }),
    confirmPassword: z.string()
  })
  .superRefine(passwordMatchRefinement)

export const forgotPasswordSchema = z.object({
  email: z.string().email({ message: 'Email is invalid' })
})

export const resetPwdSchema = passwordsSchema
