import FormGenerator from '@/components/forms/form-generator'
import { INSERT_URL_FORM } from '@/constants/forms'
import { useFormContext } from 'react-hook-form'
import type { UrlFormValues } from './tiptap-menu'

export default function InputLinkForm() {
  const {
    formState: { errors },
    control
  } = useFormContext<UrlFormValues>()

  return (
    <>
      {INSERT_URL_FORM.map((field) => {
        return (
          <FormGenerator key={field.id} control={control} errors={errors} className='font-normal min-w-72' {...field} />
        )
      })}
    </>
  )
}
