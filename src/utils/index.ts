import { twMerge } from 'tailwind-merge'
import { Route } from '@/models/base.model'
import { Token } from '@/hooks/use-tokens'
import { FieldErrors, FieldValues } from 'react-hook-form'
import { DATE_FORMAT, ROLES } from '@/constants'
import { BS_SIDEBAR_MENU_ITEMS } from '@/constants/menu-items'
import { addDays, format } from 'date-fns'
import { type ClassValue, clsx } from 'clsx'

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

export const isAllowRoles = (roles: string[], user: Token | null) => user?.role.some((role) => roles.includes(role))

export const getErrorState = <T extends FieldValues>(errors: FieldErrors<T>, fieldName: keyof T) => {
  return errors[fieldName]
}

export const getBSSidebar = (user: Token | null) => {
  const menuItems = []
  if (isAllowRoles([ROLES.STUDENT], user)) {
    menuItems.push(...BS_SIDEBAR_MENU_ITEMS.GENERAL, ...BS_SIDEBAR_MENU_ITEMS.STUDENT)
  } else if (isAllowRoles([ROLES.MENTOR], user)) {
    menuItems.push(...BS_SIDEBAR_MENU_ITEMS.GENERAL, ...BS_SIDEBAR_MENU_ITEMS.MENTOR)
    if (isAllowRoles([ROLES.REVIEWER], user)) {
      menuItems.push(...BS_SIDEBAR_MENU_ITEMS.REVIEWER)
      if (isAllowRoles([ROLES.MANAGER], user)) {
        menuItems.push(...BS_SIDEBAR_MENU_ITEMS.MANAGER)
      }
    }
  } else {
    menuItems.push(...BS_SIDEBAR_MENU_ITEMS.GENERAL)
  }

  return menuItems
}

export const formatDBDate = ({
  date,
  daysToAdd,
  formatter
}: {
  date: string | undefined
  daysToAdd?: number
  formatter?: string
}) => {
  if (!date) return ''
  if (typeof daysToAdd === 'number') {
    const nextDay = addDays(new Date(date), daysToAdd)
    return format(nextDay, DATE_FORMAT.DATEPICKER)
  }
  return format(new Date(date), formatter || DATE_FORMAT.DATEPICKER)
}

export const getTextFromHTML = (html: string) => {
  const parser = new DOMParser()
  const parsed = parser.parseFromString(html, 'text/html')
  return parsed.body.textContent || ''
}
