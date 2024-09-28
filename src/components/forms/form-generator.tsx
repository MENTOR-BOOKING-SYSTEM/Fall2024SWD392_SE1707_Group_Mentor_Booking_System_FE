import FormError from './form-error'
import { Checkbox, Input, Select, SelectItem } from '@nextui-org/react'
import { EyeIcon, EyeOff } from 'lucide-react'
import { useState } from 'react'
import type { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

type FormGeneratorProps = {
  type: 'text' | 'password' | 'email'
  inputType: 'input' | 'select' | 'textarea' | 'checkbox'
  options?: { value: string; label: string; id: string }[]
  label?: string
  placeholder: string
  register: UseFormRegister<any>
  name: string
  errors: FieldErrors<FieldValues>
  form?: string
  defaultValue?: string
  autoFocus?: boolean
  optional?: boolean
  className?: string
}

export default function FormGenerator({
  type,
  inputType,
  options,
  label,
  placeholder,
  register,
  name,
  errors,
  form,
  defaultValue,
  autoFocus,
  optional,
  className
}: FormGeneratorProps) {
  const [isShowPassword, setIsShowPassword] = useState(true)

  const handleTogglePassword = () => {
    setIsShowPassword((prev) => !prev)
  }

  switch (inputType) {
    case 'checkbox':
      return (
        <label className='flex items-center gap-2' htmlFor={`select-${label}`}>
          <Checkbox className={className} id={`select-${label}`} {...register(name)} />
          {label}
        </label>
      )
    case 'select':
      return (
        <label htmlFor={`select-${label}`}>
          {label}
          <Select className={className}>
            {options
              ? options?.map((option) => (
                  <SelectItem key={option.id} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))
              : []}
          </Select>
          <FormError errors={errors} identifier={name} />
        </label>
      )
    default:
      return (
        <label className='flex flex-col gap-2 relative' htmlFor={`input-${label}`}>
          <div className='flex items-center gap-2'>
            <p className='font-semibold'>{label}</p>
            {optional && <p className='text-xs font-normal text-muted-foreground'>optional</p>}
          </div>
          <Input
            id={`input-${label}`}
            type={type === 'password' ? (isShowPassword ? 'password' : 'text') : type}
            placeholder={placeholder}
            form={form}
            defaultValue={defaultValue}
            className={className}
            autoFocus={autoFocus}
            endContent={
              type === 'password' ? (
                <button type='button' onClick={handleTogglePassword}>
                  {isShowPassword ? <EyeOff className='w-5 h-5' /> : <EyeIcon className='w-5 h-5' />}
                </button>
              ) : null
            }
            {...register(name)}
          />
          <FormError errors={errors} identifier={name} />
        </label>
      )
  }
}
