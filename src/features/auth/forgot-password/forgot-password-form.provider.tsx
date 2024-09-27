import AuthIcons from '../components/auth-icons'
import ForgotPasswordForm, { type ForgotPasswordFormValues } from './forgot-password-form'
import Button from '@/components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { forgotPasswordSchema } from '@/models/schemas/auth.schema'
import { useAppDispatch } from '@/lib/redux-toolkit/hooks'
import { goToStep } from '@/lib/redux-toolkit/slices/current-step.slice'

export default function ForgotPasswordFormProvider() {
  const dispatch = useAppDispatch()
  const forgotMethods = useForm<ForgotPasswordFormValues>({ resolver: zodResolver(forgotPasswordSchema) })

  const onSubmit = () => {
    dispatch(goToStep({ key: 'password', step: 1 }))
  }

  return (
    <FormProvider {...forgotMethods}>
      <div className='flex flex-col w-full items-center gap-3'>
        <AuthIcons type='key' />
        <label className='block text-3xl font-bold'>Forgot password</label>
        <label className='font-normal text-xs text-center mb-10'>
          Enter the email associated with your account, and we'll send you an email with instructions to reset your
          password.
        </label>
        <form className='w-full flex flex-col gap-2' onSubmit={forgotMethods.handleSubmit(onSubmit)}>
          <ForgotPasswordForm />
          <Button color='primary' type='submit' className='w-full mt-5'>
            Send verification code
          </Button>
        </form>
      </div>
    </FormProvider>
  )
}
