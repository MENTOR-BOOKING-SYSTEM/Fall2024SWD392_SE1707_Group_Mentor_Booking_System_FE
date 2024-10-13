import AuthHeader from '../components/auth-header'
import OAuthGoogle from '../oauth-google/oauth-google'
import LoginForm from './login-form'
import Button from '@/components/ui/button'
import { PUBLIC_ROUTES } from '@/routes/routes'
import { Divider } from '@nextui-org/divider'
import { FormProvider, SubmitHandler } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { type LoginFormValues, useLogin } from './use-login'

export default function LoginFormProvider() {
  const { loginMutation, methods } = useLogin()

  const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
    loginMutation.mutate(data)
  }

  return (
    <FormProvider {...methods}>
      <AuthHeader title='Welcome back' />
      <div className='flex flex-col w-full gap-3'>
        <form className='w-full flex flex-col' onSubmit={methods.handleSubmit(onSubmit)}>
          <LoginForm />
          <Button color='primary' type='submit' className='mt-7' isLoading={loginMutation.isPending}>
            Login
          </Button>
          <div className='w-full flex items-center justify-between my-2'>
            <Divider className='max-w-[45%]' />
            <p className='text-xs text-center text-gray-400 mx-2'>or</p>
            <Divider className='max-w-[45%]' />
          </div>
          <GoogleOAuthProvider clientId={import.meta.env.VITE_GCP_CLIENT_ID}>
            <OAuthGoogle />
          </GoogleOAuthProvider>
          <Link to={PUBLIC_ROUTES.FORGOT_PASSWORD}>
            <p className='text-xs font-medium text-center text-primary cursor-pointer'>Forgot password?</p>
          </Link>
        </form>
      </div>
    </FormProvider>
  )
}
