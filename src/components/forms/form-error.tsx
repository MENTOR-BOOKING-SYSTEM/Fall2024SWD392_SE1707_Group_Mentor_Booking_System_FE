import { cn } from '@/utils'
import type { FieldErrors, Path } from 'react-hook-form'

interface FormErrorProps<T> {
  errors: FieldErrors
  identifier: Path<T>
  className?: string
}

export default function FormError<T>({ errors, identifier, className }: FormErrorProps<T>) {
  const errorMsg = errors[identifier as string]?.message

  return (
    <>
      {errors[identifier as string] && (
        <p className={cn('text-red-500 text-xs font-normal', className)}>{errorMsg as string}</p>
      )}
    </>
  )
}
