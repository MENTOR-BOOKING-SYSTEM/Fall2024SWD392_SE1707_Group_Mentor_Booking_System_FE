import FormGenerator from '@/components/forms/form-generator'
import { USER_RESET_PASSWORD_FORM } from '@/constants/forms'
import { useFormContext } from 'react-hook-form'
import type { ResetPwdFormValues } from './use-reset-pwd'

export default function ResetPwdForm() {
  const {
    register,
    formState: { errors }
  } = useFormContext<ResetPwdFormValues>()

  return (
    <div className='flex flex-col gap-7 w-full'>
      {USER_RESET_PASSWORD_FORM.map((field) => {
        return (
          <FormGenerator
            key={field.id}
            register={register}
            errors={errors}
            className='min-w-72 text-center'
            {...field}
          />
        )
      })}
    </div>
  )
}
