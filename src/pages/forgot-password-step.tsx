import ForgotPasswordFormProvider from '../features/auth/forgot-password/forgot-password-form.provider'
import OTPFormProvider from '../features/auth/otp/otp-form.provider'
import ResetPasswordFormProvider from '../features/auth/reset-password/reset-password-form.provider'
import { useAppSelector } from '@/lib/redux-toolkit/hooks'
import { Navigate } from 'react-router-dom'
import { PUBLIC_ROUTES } from '@/routes/routes'

export default function ForgotPasswordStep() {
  const {} = useAppSelector((state) => state.currentStep)

  // switch (currentStep) {
  //   case 1:
  //     return <ForgotPasswordFormProvider />
  //   case 2:
  //     return <OTPFormProvider />
  //   case 3:
  //     return <ResetPasswordFormProvider />
  //   default:
  //     return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />
  // }
}
