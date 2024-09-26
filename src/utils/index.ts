import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
