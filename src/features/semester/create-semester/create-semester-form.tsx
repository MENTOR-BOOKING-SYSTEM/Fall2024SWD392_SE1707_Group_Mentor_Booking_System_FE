import FormError from '@/components/forms/form-error'
import { Controller, useFormContext } from 'react-hook-form'
import { CreateSemesterFormValues } from './use-create-semester'
import { Input, Textarea } from '@nextui-org/input'
import { DatePicker } from '@nextui-org/react'
import { addDays, format } from 'date-fns'
import { parseAbsolute } from '@internationalized/date'
import { Semester } from '@/models/semester.model'
import { getErrorState } from '@/utils'

interface CreateSemesterFormProps {
  latestSemester: Semester | null
}
// TODO: Auto select the endDate to remain a 16 weeks period with the startDate
// TODO: Print out error
export default function CreateSemesterForm({ latestSemester }: CreateSemesterFormProps) {
  const {
    control,
    formState: { errors }
  } = useFormContext<CreateSemesterFormValues>()

  return (
    <div className='flex flex-col gap-3'>
      <Controller
        control={control}
        name='semesterName'
        render={({ field: { onChange, value } }) => (
          <Input
            onChange={onChange}
            value={value}
            label='Semester name'
            placeholder='Enter semester name'
            autoFocus
            errorMessage={getErrorState(errors, 'semesterName')?.message}
            isInvalid={!!getErrorState(errors, 'semesterName')}
            className='relative'
          />
        )}
      />
      <FormError identifier='semesterName' errors={errors} />
      <Controller
        control={control}
        name='description'
        render={({ field: { onChange, value } }) => (
          <Textarea
            value={value ?? ''}
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
      <div className='flex items-center gap-3'>
        <Controller
          control={control}
          name='startDate'
          render={({ field: { onChange } }) => (
            <DatePicker
              minValue={parseAbsolute(addDays(new Date(latestSemester?.endDate || ''), 2).toISOString(), 'UTC')}
              onChange={(e) => {
                const date = new Date(e.year, e.month - 1, e.day)
                onChange(format(date, 'yyyy-MM-dd HH:mm:ss'))
              }}
              label='Start date'
            />
          )}
        />
        <p className='text-sm mx-2'>to</p>
        <Controller
          control={control}
          name='endDate'
          render={({ field: { onChange } }) => (
            <DatePicker
              onChange={(e) => {
                const date = new Date(e.year, e.month - 1, e.day)
                onChange(format(date, 'yyyy-MM-dd HH:mm:ss'))
              }}
              label='End date'
            />
          )}
        />
      </div>
    </div>
  )
}
