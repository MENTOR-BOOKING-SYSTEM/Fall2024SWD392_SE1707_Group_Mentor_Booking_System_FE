import { getErrorState } from '@/utils'
import { Input, Textarea } from '@nextui-org/input'
import { Controller, useFormContext } from 'react-hook-form'
import { CriteriaFormValues } from './use-create-criteria'
import { useGetCriteriaTypes } from './use-get-criteria-types'
import { Select, SelectItem, Spinner } from '@nextui-org/react'

interface CreateCriteriaFormProps {
  isDisabled?: boolean
}

export default function CreateCriteriaForm({ isDisabled }: CreateCriteriaFormProps) {
  const {
    control,
    formState: { errors }
  } = useFormContext<CriteriaFormValues>()

  const { data, isLoading } = useGetCriteriaTypes()

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='flex flex-col gap-3'>
      <Controller
        control={control}
        name='name'
        render={({ field: { onChange, value } }) => (
          <Input
            label='Criteria name'
            placeholder='Enter criteria name'
            defaultValue={value}
            onChange={onChange}
            autoFocus
            errorMessage={getErrorState(errors, 'name')?.message}
            isInvalid={!!getErrorState(errors, 'name')}
            className='relative'
            isReadOnly={isDisabled}
          />
        )}
      />
      <Controller
        control={control}
        name='description'
        render={({ field: { onChange, value } }) => (
          <Textarea
            label='Description'
            placeholder='Enter description'
            defaultValue={value}
            onChange={onChange}
            disableAnimation
            disableAutosize
            classNames={{
              input: 'resize-y min-h-24'
            }}
            isReadOnly={isDisabled}
          />
        )}
      />
      <Controller
        control={control}
        name='type'
        render={({ field: { onChange, value } }) => (
          <Select
            isLoading={isLoading}
            onChange={onChange}
            defaultSelectedKeys={value ? [String(value)] : ['1']}
            items={data}
            label='Type'
            placeholder='Select a type'
            selectionMode='single'
            isDisabled={isDisabled}
          >
            {(item) => <SelectItem key={item.criteriaTypeID}>{item.type}</SelectItem>}
          </Select>
        )}
      />
    </div>
  )
}
