import AuthIcons from '../components/auth-icons'
import ResetPwdForm from './reset-pwd-form'
import Button from '@/components/ui/button'
import { FormProvider } from 'react-hook-form'
import { ResetPwdFormValues, useResetPwd } from './use-reset-pwd'
import { PUBLIC_ROUTES } from '@/routes/routes'
import { Link } from 'react-router-dom'

export default function ResetPwdFormProvider() {
  const { resetPwdMutation, methods } = useResetPwd()

  const onSubmit = (data: ResetPwdFormValues) => {
    // resetPwdMutation.mutate(data)
    console.log(data)
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
