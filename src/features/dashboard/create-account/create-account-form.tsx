import Dropzone from '@/components/shared/dropzone/dropzone'
import { getErrorState } from '@/utils'
import { Input } from '@nextui-org/input'
import { Avatar, Chip, Spinner } from '@nextui-org/react'
import { Select, SelectItem } from '@nextui-org/select'
import { Controller, useFormContext } from 'react-hook-form'
import { useGetAllRoles } from '../get-all-roles/use-get-all-roles'
import { CreateAccountFormValues } from './use-create-account'
import { FileRejection } from 'react-dropzone'

interface CreateAccountFormProps {
  isPending: boolean
  onDrop: <T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => void
  avatar: string
}

export default function CreateAccountForm({ isPending, onDrop, avatar }: CreateAccountFormProps) {
  const {
    control,
    formState: { errors }
  } = useFormContext<CreateAccountFormValues>()

  const { data, isLoading } = useGetAllRoles()

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-6 justify-between'>
        <Dropzone onDrop={onDrop}>
          <Avatar className='cursor-pointer w-20 h-20' isBordered color='primary' src={avatar} />
        </Dropzone>
        <div className='flex flex-col gap-3 flex-1'>
          <Controller
            control={control}
            name='firstName'
            render={({ field: { onChange, value } }) => (
              <Input
                label='First name (optional)'
                placeholder='Enter first name'
                defaultValue={value}
                onChange={onChange}
                errorMessage={getErrorState(errors, 'firstName')?.message}
                isInvalid={!!getErrorState(errors, 'firstName')}
                className='relative'
                isDisabled={isPending}
              />
            )}
          />
          <Controller
            control={control}
            name='lastName'
            render={({ field: { onChange, value } }) => (
              <Input
                label='Last name (optional)'
                placeholder='Enter last name'
                defaultValue={value}
                onChange={onChange}
                errorMessage={getErrorState(errors, 'lastName')?.message}
                isInvalid={!!getErrorState(errors, 'lastName')}
                className='relative'
                isDisabled={isPending}
              />
            )}
          />
        </div>
      </div>
      <Controller
        control={control}
        name='email'
        render={({ field: { onChange, value } }) => (
          <Input
            label='Email'
            placeholder='Enter email'
            defaultValue={value}
            onChange={onChange}
            autoFocus
            errorMessage={getErrorState(errors, 'email')?.message}
            isInvalid={!!getErrorState(errors, 'email')}
            className='relative'
            isDisabled={isPending}
          />
        )}
      />
      <Controller
        control={control}
        name='username'
        render={({ field: { onChange, value } }) => (
          <Input
            label='Username'
            placeholder='Enter username'
            defaultValue={value}
            onChange={onChange}
            errorMessage={getErrorState(errors, 'username')?.message}
            isInvalid={!!getErrorState(errors, 'username')}
            className='relative'
            isDisabled={isPending}
          />
        )}
      />
      <Controller
        control={control}
        name='password'
        render={({ field: { onChange, value } }) => (
          <Input
            label='Password'
            placeholder='Enter password'
            defaultValue={value}
            onChange={onChange}
            errorMessage={getErrorState(errors, 'password')?.message}
            isInvalid={!!getErrorState(errors, 'password')}
            className='relative'
            type='password'
            isDisabled={isPending}
          />
        )}
      />
      <Controller
        control={control}
        name='confirmPassword'
        render={({ field: { onChange, value } }) => (
          <Input
            label='Confirm password'
            placeholder='Enter password again'
            defaultValue={value}
            onChange={onChange}
            errorMessage={getErrorState(errors, 'confirmPassword')?.message}
            isInvalid={!!getErrorState(errors, 'confirmPassword')}
            className='relative'
            type='password'
            isDisabled={isPending}
          />
        )}
      />
      <Controller
        control={control}
        name='roles'
        render={({ field: { onChange } }) => (
          <Select
            isLoading={isLoading}
            onChange={(e) => {
              if (e.target.value) {
                onChange(e.target.value.split(',').map((id) => parseInt(id)))
              } else {
                onChange([])
              }
            }}
            classNames={{
              trigger: 'min-h-12 py-2'
            }}
            items={data}
            label='Role(s)'
            placeholder='Select role(s)'
            selectionMode='multiple'
            isInvalid={!!getErrorState(errors, 'roles')}
            errorMessage={getErrorState(errors, 'roles')?.message}
            isMultiline={true}
            isDisabled={isPending}
            renderValue={(items) => {
              return (
                <div className='flex flex-wrap gap-2'>
                  {items.map((item) => {
                    return (
                      <Chip color='primary' className='text-white' key={item.key}>
                        {item.data?.roleName}
                      </Chip>
                    )
                  })}
                </div>
              )
            }}
          >
            {(item) => <SelectItem key={item.roleID}>{item.roleName}</SelectItem>}
          </Select>
        )}
      />
    </div>
  )
}
