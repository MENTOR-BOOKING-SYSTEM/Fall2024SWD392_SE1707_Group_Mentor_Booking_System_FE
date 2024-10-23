import FormError from './form-error'
import { Checkbox, Input } from '@nextui-org/react'
import { EyeIcon, EyeOff } from 'lucide-react'
import { ComponentProps, ElementType, useState } from 'react'
import { Control, Controller, Path, type FieldErrors, type FieldValues } from 'react-hook-form'

interface FormGeneratorProps<T extends FieldValues> {
  type: 'text' | 'password' | 'email'
  inputType: 'input' | 'textarea' | 'checkbox' | 'select' | 'custom'
  label?: string
  placeholder?: string
  control: Control<T>
  name: Path<T>
  errors: FieldErrors<T>
  defaultValue?: string
  autoFocus?: boolean
  optional?: boolean
  className?: string
  isDisabled?: boolean
  component?: ComponentProps<ElementType>
}

export default function FormGenerator<T extends FieldValues>({
  type,
  inputType,
  label,
  placeholder,
  name,
  errors,
  defaultValue,
  autoFocus,
  optional,
  className,
  isDisabled,
  control,
  // eslint-disable-next-line @typescript-eslint/naming-convention
  component: Component = Input
}: FormGeneratorProps<T>) {
  const [isShowPassword, setIsShowPassword] = useState(true)

  const handleTogglePassword = () => {
    setIsShowPassword((prev) => !prev)
  }

  switch (inputType) {
    case 'checkbox':
      return (
        <label className='flex items-center gap-2 relative' htmlFor={`select-${label}`}>
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, ref } }) => (
              <>
                <Checkbox className={className} id={`select-${label}`} onChange={onChange} ref={ref} />
                {label}
              </>
            )}
          />
          <FormError errors={errors} identifier={name} className='absolute -bottom-5' />
        </label>
      )
    case 'select':
      return (
        <label className='flex items-center gap-2 relative' htmlFor={`select-${label}`}>
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, ref } }) => (
              <>
                <Checkbox className={className} id={`select-${label}`} onChange={onChange} ref={ref} />
                {label}
              </>
            )}
          />
          <FormError errors={errors} identifier={name} className='absolute -bottom-5' />
        </label>
      )
    case 'input':
      return (
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, ref, value } }) => (
            <label className='flex flex-col gap-2 relative' htmlFor={`input-${label}`}>
              <div className='flex items-center gap-2'>
                <p className='font-semibold'>{label}</p>
                {optional && <p className='text-xs font-normal text-muted-foreground'>optional</p>}
              </div>
              <Input
                id={`input-${label}`}
                ref={ref}
                defaultValue={defaultValue}
                value={value}
                type={type === 'password' ? (isShowPassword ? 'password' : 'text') : type}
                placeholder={placeholder}
                className={className}
                autoFocus={autoFocus}
                isDisabled={isDisabled}
                onChange={onChange}
                endContent={
                  type === 'password' ? (
                    <button type='button' onClick={handleTogglePassword}>
                      {isShowPassword ? <EyeOff className='w-5 h-5' /> : <EyeIcon className='w-5 h-5' />}
                    </button>
                  ) : null
                }
              />
              <FormError errors={errors} identifier={name} className='absolute -bottom-5' />
            </label>
          )}
        />
      )
    // default:
    //   return (
    //     <Controller
    //       control={control}
    //       name={name}
    //       render={({ field: { onChange, ref } }) => (
    //         <div>
    //           <Component ref={ref} onChange={onChange} />
    //         </div>
    //       )}
    //     />
    //   )
  }
}
