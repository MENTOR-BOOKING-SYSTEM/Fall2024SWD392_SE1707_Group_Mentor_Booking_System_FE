import { twMerge } from 'tailwind-merge'
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
