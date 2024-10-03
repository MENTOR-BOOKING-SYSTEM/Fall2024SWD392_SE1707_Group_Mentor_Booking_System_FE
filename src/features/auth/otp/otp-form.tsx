import FormGenerator from '@/components/forms/form-generator'
import { OTP_FORM } from '@/constants/forms'
import { useFormContext } from 'react-hook-form'
import type { OtpFormValues } from './use-otp'

export default function OtpForm() {
  const {
    register,
    formState: { errors }
  } = useFormContext<OtpFormValues>()

  return (
    <div className='flex flex-col gap-7 w-full'>
      {OTP_FORM.map((field) => {
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
