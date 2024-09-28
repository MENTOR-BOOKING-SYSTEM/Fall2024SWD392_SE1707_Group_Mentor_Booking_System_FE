import { resetPwdSchema } from '@/models/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type ResetPwdFormValues = z.infer<typeof resetPwdSchema>

export const useResetPwd = () => {
  const methods = useForm<ResetPwdFormValues>({
    resolver: zodResolver(resetPwdSchema)
  })

  const resetPwdMutation = useMutation({})

  return { resetPwdMutation, methods }
}
