import AuthHeader from '../components/auth-header'
import LoginForm from './login-form'
import Button from '@/components/ui/button'
import { Icons } from '@/components/ui/icons'
import { loginSchema } from '@/models/schemas/auth.schema'
import { PUBLIC_ROUTES } from '@/routes/routes'
import { FormProvider } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { z } from 'zod'
import { useLogin } from './use-login'

export type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginFormProvider() {
  const { loginMutation, methods } = useLogin()

  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate(data)
  }

  return (
    <FormProvider {...methods}>
      <AuthHeader title='Welcome back' />
      <div className='flex flex-col w-full gap-3'>
        <form className='w-full flex flex-col' onSubmit={methods.handleSubmit(onSubmit)}>
          <LoginForm />
          <Button color='primary' type='submit' className='mt-7 mb-2'>
            Login
          </Button>
          <Button className='w-full border-1 mb-8' variant='bordered'>
            <div className='flex items-center w-full'>
              <Icons.google className='w-6 h-6 mr-2' />
              <label className='flex-1 cursor-pointer'>Continue with Google</label>
            </div>
          </Button>
          <Link to={PUBLIC_ROUTES.FORGOT_PASSWORD}>
            <p className='text-xs font-medium text-center text-primary cursor-pointer'>Forgot password?</p>
          </Link>
        </form>
      </div>
    </FormProvider>
  )
}
