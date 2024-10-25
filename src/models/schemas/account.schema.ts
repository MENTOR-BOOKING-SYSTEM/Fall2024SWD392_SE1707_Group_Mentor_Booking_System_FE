import { z } from 'zod'
import { passwordsSchema } from './auth.schema'

export const accountSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  username: z
    .string({
      message: 'Username is required'
    })
    .refine((val) => val.length !== 0, {
      message: 'Username is required'
    })
    .refine((val) => val.length >= 4 && val.length <= 50, {
      message: 'Username must be between 4 and 50 characters'
    })
    .refine((val) => /^[a-zA-Z][a-zA-Z0-9._]*$/.test(val), {
      message:
        'Username can only include alphanumeric characters, underscores, and periods, and must start with a letter'
    }),
  email: z
    .string({
      message: 'Email is required'
    })
    .email({ message: 'Email is invalid' }),
  avatarUrl: z.string().optional(),
  roles: z
    .array(z.number(), { message: 'At least one role is required' })
    .min(1, { message: 'At least one role is required' })
})

export const createAccountSchema = accountSchema.and(passwordsSchema)
