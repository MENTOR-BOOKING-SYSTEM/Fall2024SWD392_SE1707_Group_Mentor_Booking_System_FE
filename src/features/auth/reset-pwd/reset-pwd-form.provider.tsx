import AuthIcons from '../components/auth-icons'
import ResetPwdForm from './reset-pwd-form'
import Button from '@/components/ui/button'
import { FormProvider } from 'react-hook-form'
import { ResetPwdFormValues, useResetPwd } from './use-reset-pwd'
import { PUBLIC_ROUTES } from '@/routes/routes'
import { Link, Navigate } from 'react-router-dom'
import { useVerifyCode } from '../verify-code/use-verify-code'
import { useLocalStorage } from 'usehooks-ts'
import { CodeModel } from '@/models/base.model'
import { Spinner } from '@nextui-org/react'

export default function ResetPwdFormProvider() {
  const [{ code }] = useLocalStorage<CodeModel>('code', { code: '' })
  const { resetPwdMutation, methods } = useResetPwd()
  const { isLoading, isError } = useVerifyCode(code || '')

  if (isLoading) {
    return <Spinner />
  } else if (isError) {
    return <Navigate to={PUBLIC_ROUTES.FORGOT_PASSWORD} replace />
  }

  const onSubmit = (data: ResetPwdFormValues) => {
    resetPwdMutation.mutate({ forgotPasswordToken: code, ...data })
  }

  return (
    <FormProvider {...methods}>
      <div className='flex flex-col items-center w-full gap-3 px-2'>
        <AuthIcons type='reset' />
        <label className='block text-2xl font-bold'>Set new password</label>
        <label className='block font-normal mb-7'>Enter your new password below</label>
        <form className='w-full flex flex-col' onSubmit={methods.handleSubmit(onSubmit)}>
          <ResetPwdForm />
          <Button isLoading={resetPwdMutation.isPending} type='submit' color='primary' className='mt-7'>
            Reset password
          </Button>
        </form>
        <Link className='text-primary font-semibold' to={PUBLIC_ROUTES.LOGIN}>
          Back to login
        </Link>
      </div>
    </FormProvider>
  )
}
