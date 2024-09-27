import FormGenerator from '@/components/forms/form-generator'
import { USER_FORGOT_PASSWORD_FORM } from '@/constants/forms'
import { forgotPasswordSchema } from '@/models/schemas/auth.schema'
import { useFormContext } from 'react-hook-form'
import { z } from 'zod'

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>

export default function ForgotPasswordForm() {
  const {
    register,
    formState: { errors }
  } = useFormContext<ForgotPasswordFormValues>()

  return (
    <>
      {USER_FORGOT_PASSWORD_FORM.map((field) => {
        return <FormGenerator key={field.id} register={register} errors={errors} {...field} />
      })}
    </>
  )
}
