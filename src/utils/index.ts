import { twMerge } from 'tailwind-merge'
import { Route } from '@/models/base.model'
import { type ClassValue, clsx } from 'clsx'
import { Token } from '@/hooks/use-tokens'

/**
 * Hàm giúp nối các className Tailwind lại với nhau
 * @param inputs: ClassValue[]
 * @example
 * <div className={cn('text-red-500', 'bg-blue-500')} />
 * @returns thẻ div với className="text-red-500 bg-blue-500"
 * @author DanhYeuLapTrinh
 * @version 1.0.1.0 [version] [subChange] [delivery] [fixBug]
 * Version 1 chưaP có sự thay đổi lớn (>90%) đã delivery và chưa fixBug
 */
export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs))
}

/**
 * Hàm nhận vào email và trả về email đã censored
 * @param inputs: email: string
 * @example demo@gmail.com
 * @returns demo****@gmail.com
 * @author DanhYeuLapTrinh
 * @version 1.0.1.0
 */
export const maskEmail = (email: string) => {
  if (!email.includes('@')) return email
  const [localPart, domain] = email.split('@')
  const maskedLocalPart = localPart.substring(0, 4) + '****'
  return `${maskedLocalPart}@${domain}`
}

/**
 * Hàm nhận vào password và trả về true nếu password đủ mạnh, ngược lại trả về false
 * @param inputs: password: string
 * @example password
 * @returns false
 * @author DanhYeuLapTrinh
 * @version 1.0.1.0
 */
export const validatePasswordStrength = (password: string) => {
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /[0-9]/.test(password)
  const hasSpecialChar = /[`!@#$%^&*()_\-+=[\]{};':"\\|,.<>/?~ ]/.test(password)

  return hasUppercase && hasLowercase && hasNumber && hasSpecialChar
}

export const generateBreadcrumbLabels = (routes: Route) => {
  return Object.values(routes).reduce(
    (acc, route) => {
      acc[route.path] = route.bcLabel
      return acc
    },
    {} as { [key: string]: string }
  )
}

export const isAllowRoles = (roles: string[], user: Token | undefined) =>
  user?.role.some((role) => roles.includes(role))
