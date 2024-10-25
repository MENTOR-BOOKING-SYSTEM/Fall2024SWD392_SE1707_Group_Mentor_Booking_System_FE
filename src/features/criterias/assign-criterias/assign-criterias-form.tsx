import { cn } from '@/utils'
import { Checkbox, CheckboxGroup } from '@nextui-org/checkbox'
import { Chip } from '@nextui-org/chip'
import { Controller, useFormContext } from 'react-hook-form'
import { useViewCriterias } from '../view-criterias/use-view-criterias'
import { getColor, getStatus } from '../view-criterias/utils/criteria.util'
import { AssignCriteriasFormValues } from './use-assign-criterias'

export default function AssignCriteriasForm() {
  const { control } = useFormContext<AssignCriteriasFormValues>()
  const { data: criterias } = useViewCriterias()

  return (
    <Controller
      control={control}
      name='criteria'
      render={({ field: { onChange, value } }) => {
        return (
          <CheckboxGroup className='overflow-auto' value={value || []} onChange={onChange}>
            {criterias?.map((criteria) => {
              const status = getStatus(String(criteria.type))
              return (
                <Checkbox
                  key={criteria.criteriaID}
                  classNames={{
                    base: cn(
                      'inline-flex min-w-full bg-content1 m-0',
                      'hover:bg-content2 items-center justify-start',
                      'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
                      'data-[selected=true]:border-primary'
                    ),
                    label: 'w-full'
                  }}
                  aria-label={criteria.criteriaName}
                  value={String(criteria.criteriaID)}
                >
                  <div className='w-full flex justify-between gap-2'>
                    <div className='flex flex-col gap-1'>
                      <p className='font-bold'>{criteria.criteriaName}</p>
                      <p className='text-sm'>{criteria.description}</p>
                    </div>
                    <Chip color={getColor(status)} variant='flat'>
                      {status}
                    </Chip>
                  </div>
                </Checkbox>
              )
            })}
          </CheckboxGroup>
        )
      }}
    />
  )
}
