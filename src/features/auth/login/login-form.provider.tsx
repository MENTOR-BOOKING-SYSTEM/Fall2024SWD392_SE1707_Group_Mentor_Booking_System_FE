import Button from '@/components/ui/button'
import LoginForm from './login-form'
import { loginSchema } from '@/models/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { Icons } from '@/components/ui/icons'
import { Link, useNavigate } from 'react-router-dom'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from '@/routes/routes'
import AuthHeader from '../components/auth-header'
import authService from '@/services/auth.services'

export type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginFormProvider() {
  const navigate = useNavigate()
  const methods = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginFormValues) => {
    const response = await authService.login(data.email, data.password)
    console.log(response)
    if (response) {
      navigate(PRIVATE_ROUTES.ROOT)
    }
  }

  return (
    <FormProvider {...methods}>
      <AuthHeader title='Welcome back' />
      <div className='flex flex-col w-full gap-3'>
        <form className='w-full flex flex-col' onSubmit={methods.handleSubmit(onSubmit)}>
          <LoginForm />
          <Button color='primary' type='submit' className='mt-6 mb-2'>
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
