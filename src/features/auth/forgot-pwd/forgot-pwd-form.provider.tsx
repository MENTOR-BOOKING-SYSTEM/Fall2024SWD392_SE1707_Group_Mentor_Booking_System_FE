import AuthIcons from '../components/auth-icons'
import ForgotPwdForm from './forgot-pwd-form'
import Button from '@/components/ui/button'
import { FormProvider, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { PUBLIC_ROUTES } from '@/routes/routes'
import { type ForgotPasswordFormValues, useForgotPwd } from './use-forgot-pwd'

export default function ForgotPwdFormProvider() {
  const { forgotPwdMutation, methods } = useForgotPwd()

  const onSubmit: SubmitHandler<ForgotPasswordFormValues> = (data) => {
    forgotPwdMutation.mutate(data)
  }

  return (
    <FormProvider {...methods}>
      <div className='flex flex-col w-full items-center gap-3'>
        <AuthIcons type='key' />
        <label className='block text-3xl font-bold'>Forgot password?</label>
        <label className='font-normal text-xs text-center mb-10'>
          Enter the email associated with your account, and we'll send you an email with instructions to reset your
          password.
        </label>
        <form className='w-full flex flex-col gap-2' onSubmit={methods.handleSubmit(onSubmit)}>
          <ForgotPwdForm />
          <Button color='primary' type='submit' className='mt-5' isLoading={forgotPwdMutation.isPending}>
            Send verification code
          </Button>
        </form>
        <Link className='text-primary font-semibold' to={PUBLIC_ROUTES.LOGIN}>
          Back
        </Link>
      </div>
    </FormProvider>
  )
}
