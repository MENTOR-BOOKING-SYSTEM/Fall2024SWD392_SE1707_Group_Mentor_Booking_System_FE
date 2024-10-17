import { getErrorState } from '@/utils'
import { Input, Textarea } from '@nextui-org/input'
import { Controller, useFormContext } from 'react-hook-form'
import { CreateCriteriaFormValues } from './use-create-criteria'
import { useGetCriteriaTypes } from './use-get-criteria-types'
import { Select, SelectItem, Spinner } from '@nextui-org/react'

export default function CreateCriteriaForm() {
  const {
    control,
    formState: { errors }
  } = useFormContext<CreateCriteriaFormValues>()

  const { data, isLoading } = useGetCriteriaTypes()

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div className='flex flex-col gap-3'>
      <Controller
        control={control}
        name='name'
        render={({ field: { onChange } }) => (
          <Input
            onChange={onChange}
            label='Criteria name'
            placeholder='Enter criteria name'
            autoFocus
            errorMessage={getErrorState(errors, 'name')?.message}
            isInvalid={!!getErrorState(errors, 'name')}
            className='relative'
          />
        )}
      />
      <Controller
        control={control}
        name='description'
        render={({ field: { onChange } }) => (
          <Textarea
            label='Description'
            onChange={onChange}
            placeholder='Enter description'
            disableAnimation
            disableAutosize
            classNames={{
              input: 'resize-y min-h-24'
            }}
          />
        )}
      />
      <Controller
        control={control}
        name='type'
        render={({ field: { onChange } }) => (
          <Select
            isLoading={isLoading}
            onChange={onChange}
            defaultSelectedKeys={['1']}
            items={data}
            label='Type'
            placeholder='Select a type'
            selectionMode='single'
          >
            {(item) => <SelectItem key={item.criteriaTypeID}>{item.type}</SelectItem>}
          </Select>
        )}
      />
    </div>
  )
}
