import authService from '@/services/auth.services'
import { resetPwdSchema } from '@/models/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { PUBLIC_ROUTES } from '@/routes/routes'
import { useLocalStorage } from 'usehooks-ts'
import { CodeModel } from '@/models/base.model'
import { toaster } from '@/components/ui/toaster'

export type ResetPwdFormValues = z.infer<typeof resetPwdSchema>

export const useResetPwd = () => {
  const navigate = useNavigate()
  const methods = useForm<ResetPwdFormValues>({
    resolver: zodResolver(resetPwdSchema)
  })

  const [_code, _setCode, removeCode] = useLocalStorage<CodeModel>('code', { code: '' })

  const resetPwdMutation = useMutation({
    mutationFn: authService.resetPwd,
    onSuccess: () => {
      methods.reset()
      toaster.success({ text: 'Password reset successfully' })
      navigate(PUBLIC_ROUTES.LOGIN)
      removeCode()
    },
    onError: () => {
      methods.reset()
      toast.error('Invalid credentials')
    }
  })

  return { resetPwdMutation, methods }
}
