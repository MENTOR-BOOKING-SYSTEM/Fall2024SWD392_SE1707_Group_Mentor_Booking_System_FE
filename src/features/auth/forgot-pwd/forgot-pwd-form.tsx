import FormGenerator from '@/components/forms/form-generator'
import { useFormContext } from 'react-hook-form'
import { USER_FORGOT_PASSWORD_FORM } from '@/constants/forms'
import type { ForgotPasswordFormValues } from './use-forgot-pwd'

export default function ForgotPwdForm() {
  const {
    register,
    formState: { errors }
  } = useFormContext<ForgotPasswordFormValues>()

  return (
    <div className='flex flex-col gap-7 w-full'>
      {USER_FORGOT_PASSWORD_FORM.map((field) => {
        return <FormGenerator key={field.id} register={register} errors={errors} {...field} />
      })}
    </div>
  )
}
