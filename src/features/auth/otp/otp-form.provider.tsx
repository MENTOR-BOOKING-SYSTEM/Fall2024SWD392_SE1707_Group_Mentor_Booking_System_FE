import OtpForm from './otp-form'
import AuthIcons from '../components/auth-icons'
import Button from '@/components/ui/button'
import { FormProvider } from 'react-hook-form'
import { OtpFormValues, useOtp } from './use-otp'
import { Link } from 'react-router-dom'
import { PUBLIC_ROUTES } from '@/routes/routes'
import { maskEmail } from '@/utils'
import { useLocalStorage } from 'usehooks-ts'
import { LOCAL_STORAGE_KEYS } from '@/constants'

export default function OtpFormProvider() {
  const { otpMutation, methods } = useOtp()
  const [value, setValue, removeValue] = useLocalStorage(LOCAL_STORAGE_KEYS.EMAIL_TEMP, '')

  const onSubmit = (data: OtpFormValues) => {
    // otpMutation.mutate(data)
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <div className='flex flex-col w-full items-center gap-3'>
        <AuthIcons type='mail' />
        <label className='block text-3xl font-bold'>OTP Verification</label>
        <div className='flex flex-col gap-1'>
          <label className='font-normal text-xs text-center'> First, enter the code sent to your email address</label>
          <label className='font-normal text-xs text-center mb-8'>{maskEmail(value)}</label>
        </div>
        <form className='w-full flex flex-col gap-2' onSubmit={methods.handleSubmit(onSubmit)}>
          <OtpForm />
          <Button color='primary' type='submit' className='mt-5' isLoading={otpMutation.isPending}>
            Continue
          </Button>
        </form>
        <Link className='text-primary font-semibold' to={PUBLIC_ROUTES.FORGOT_PASSWORD}>
          Re-enter email
        </Link>
      </div>
    </FormProvider>
  )
}
