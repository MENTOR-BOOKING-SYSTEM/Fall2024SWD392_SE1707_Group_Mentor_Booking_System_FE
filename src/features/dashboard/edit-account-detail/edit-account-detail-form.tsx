import Dropzone from '@/components/shared/dropzone/dropzone'
import { Controller, useFormContext } from 'react-hook-form'
import { EditAccountDetailFormValues } from './use-edit-account-detail'
import { Input } from '@nextui-org/input'
import { getErrorState } from '@/utils'
import { Avatar } from '@nextui-org/avatar'
import { FileRejection } from 'react-dropzone'
import { Select, SelectItem } from '@nextui-org/select'
import { Chip } from '@nextui-org/chip'
import { useGetAllRoles } from '../get-all-roles/use-get-all-roles'
import { Spinner } from '@nextui-org/react'

interface EditAccountDetailFormProps {
  onDrop: <T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => void
  avatar: string
}

export default function EditAccountDetailForm({ onDrop, avatar }: EditAccountDetailFormProps) {
  const {
    control,
    formState: { errors },
    getValues
  } = useFormContext<EditAccountDetailFormValues>()

  const { data, isLoading } = useGetAllRoles()

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='flex flex-col gap-3'>
      <div className='flex items-center gap-6 justify-between'>
        <Dropzone onDrop={onDrop}>
          <Avatar
            className='cursor-pointer w-20 h-20'
            isBordered
            color='primary'
            src={getValues('avatarUrl') ? getValues('avatarUrl') : avatar}
          />
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
            errorMessage={getErrorState(errors, 'email')?.message}
            isInvalid={!!getErrorState(errors, 'email')}
            className='relative'
            isDisabled={true}
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
            isDisabled={true}
          />
        )}
      />
      <Input
        label='Password'
        placeholder='Enter password'
        defaultValue='**********'
        className='relative'
        type='password'
        isDisabled={true}
      />
      <Controller
        control={control}
        name='roles'
        render={({ field: { onChange, value } }) => (
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
            defaultSelectedKeys={value ? value.map((role) => String(role)) : []}
            label='Role(s)'
            placeholder='Select role(s)'
            selectionMode='multiple'
            isInvalid={!!getErrorState(errors, 'roles')}
            errorMessage={getErrorState(errors, 'roles')?.message}
            isMultiline={true}
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
