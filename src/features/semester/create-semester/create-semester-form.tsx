import FormError from '@/components/forms/form-error'
import { Controller, useFormContext } from 'react-hook-form'
import { CreateSemesterFormValues } from './use-create-semester'
import { Input, Textarea } from '@nextui-org/input'
import { DatePicker } from '@nextui-org/react'
import { addDays, format } from 'date-fns'
import { CalendarDate, DateValue, parseAbsolute } from '@internationalized/date'
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
    setValue,
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
      <div className='flex items-center gap-3'>
        <Controller
          control={control}
          name='startDate'
          render={({ field: { onChange } }) => (
            <DatePicker
              minValue={
                latestSemester
                  ? new CalendarDate(
                      new Date(latestSemester.endDate).getFullYear(),
                      new Date(latestSemester.endDate).getMonth() + 1,
                      new Date(latestSemester.endDate).getDate() + 2
                    )
                  : undefined
              }
              onChange={(e: DateValue) => {
                onChange(e)
                // Calculate endDate (16 weeks later)
                const startDate = new Date(e.year, e.month - 1, e.day)
                const endDate = addDays(startDate, 16 * 7)
                // Convert endDate to string (in 'yyyy-MM-dd' format)
                const endDateString = `${endDate.getFullYear()}-${(endDate.getMonth() + 1).toString().padStart(2, '0')}-${endDate.getDate().toString().padStart(2, '0')}`
                // Set the endDate as a string
                setValue('endDate', endDateString)
              }}
              label='Start date'
            />
          )}
        />
        <p className='text-sm mx-2'>to</p>
        <Controller
          control={control}
          name='endDate'
          render={({ field: { onChange, value } }) => (
            <DatePicker
              value={
                value
                  ? new CalendarDate(
                      new Date(value).getFullYear(),
                      new Date(value).getMonth() + 1,
                      new Date(value).getDate()
                    )
                  : undefined
              }
              onChange={(e: DateValue) => {
                const endDateString = `${e.year}-${e.month.toString().padStart(2, '0')}-${e.day.toString().padStart(2, '0')}`
                onChange(endDateString)
              }}
              label='End date'
            />
          )}
        />
      </div>
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
    </div>
  )
}
