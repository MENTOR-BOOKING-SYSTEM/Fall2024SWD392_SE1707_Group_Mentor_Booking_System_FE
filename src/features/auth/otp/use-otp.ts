import { otpSchema } from '@/models/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type OtpFormValues = z.infer<typeof otpSchema>

export const useOtp = () => {
  const methods = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema)
  })

  const otpMutation = useMutation({})

  return { otpMutation, methods }
}
