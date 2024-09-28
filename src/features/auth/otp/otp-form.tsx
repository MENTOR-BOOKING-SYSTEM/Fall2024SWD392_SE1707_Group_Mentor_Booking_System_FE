import FormGenerator from '@/components/forms/form-generator'
import { OTP_FORM } from '@/constants/forms'
import { useFormContext } from 'react-hook-form'
import { OtpFormValues } from './use-otp'

interface OtpFormProps {
  digits: number
}

export default function OtpForm() {
  // const inputRefs = useRef<(HTMLInputElement | null)[]>([])
  const {
    register,
    formState: { errors }
  } = useFormContext<OtpFormValues>()

  // const handleChange = (value: string, index: number) => {
  //   if (!/^\d*$/.test(value)) return // Ensure only digits are input

  //   const newOtp = [...otp]
  //   newOtp[index] = value

  //   setOtp(newOtp)

  //   if (value && index < digits - 1) {
  //     inputRefs.current[index + 1]?.focus()
  //   }
  // }

  // const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
  //   const pastedData = event.clipboardData.getData('text')
  //   if (/^\d{5}$/.test(pastedData)) {
  //     const newOtp = pastedData.split('')
  //     setOtp(newOtp)
  //     newOtp.forEach((digit, index) => {
  //       if (inputRefs.current[index]) {
  //         inputRefs.current[index]!.value = digit
  //       }
  //     })
  //     inputRefs.current[digits - 1]?.focus()
  //   }
  // }

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
