import FormGenerator from '@/components/forms/form-generator'
import { useFormContext } from 'react-hook-form'
import { USER_LOGIN_FORM } from '@/constants/forms'
import type { LoginFormValues } from './use-login'

export default function LoginForm() {
  const {
    register,
    formState: { errors }
  } = useFormContext<LoginFormValues>()

  return (
    <div className='flex flex-col gap-7 w-full'>
      {USER_LOGIN_FORM.map((field) => {
        return (
          <FormGenerator
            key={field.id}
            register={register}
            errors={errors}
            className='font-normal min-w-72'
            {...field}
          />
        )
      })}
    </div>
  )
}
