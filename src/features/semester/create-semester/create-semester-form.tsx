import FormError from '@/components/forms/form-error'
import { Controller, useFormContext } from 'react-hook-form'
import { CreateSemesterFormValues } from './use-create-semester'
import { Input, Textarea } from '@nextui-org/input'
import { DatePicker } from '@nextui-org/react'
import { addDays } from 'date-fns'
import { CalendarDate, DateValue } from '@internationalized/date'
import { Semester } from '@/models/semester.model'
import { getErrorState } from '@/utils'

interface CreateSemesterFormProps {
  latestSemester: Semester | null
}

//   DateValue is of type CalendarDate
const toCalendarDate = (value: DateValue): CalendarDate => {
  if ('hour' in value) {
    // If it has 'hour', it's a CalendarDateTime, so we take only the date part
    return new CalendarDate(value.year, value.month, value.day)
  }
  return value as CalendarDate // Cast to CalendarDate if it's already a CalendarDate
}

//  convert string to CalendarDate
const stringToCalendarDate = (dateString: string): CalendarDate => {
  const date = new Date(dateString)
  return new CalendarDate(date.getFullYear(), date.getMonth() + 1, date.getDate())
}

// convert CalendarDate to string
const calendarDateToString = (date: CalendarDate): string => {
  return `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`
}

export default function CreateSemesterForm({ latestSemester }: CreateSemesterFormProps) {
  const {
    control,
    setValue,
    getValues,
    formState: { errors }
  } = useFormContext<CreateSemesterFormValues>()

  // calculate 16 weeks from the start date
  const calculateEndDateMinValue = (startDate: CalendarDate): CalendarDate => {
    const startJSDate = new Date(startDate.year, startDate.month - 1, startDate.day)
    const minEndDate = addDays(startJSDate, 16 * 7) // 16 weeks later
    return new CalendarDate(minEndDate.getFullYear(), minEndDate.getMonth() + 1, minEndDate.getDate())
  }

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
                const calendarDate = toCalendarDate(e)
                onChange(calendarDate) // Update startDate

                // Calculate endDate (16 weeks later)
                const endDate = calculateEndDateMinValue(calendarDate)
                setValue('endDate', calendarDateToString(endDate)) // Convert CalendarDate to string for form
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
              isDisabled={!getValues('startDate')} // Disable if no startDate
              value={
                value
                  ? stringToCalendarDate(value) // Convert string to CalendarDate
                  : undefined
              }
              // Set the minimum value for endDate to be 16 weeks after startDate
              minValue={
                getValues('startDate')
                  ? calculateEndDateMinValue(stringToCalendarDate(getValues('startDate'))) // Ensure startDate is converted correctly
                  : undefined
              }
              onChange={(e: DateValue) => {
                const calendarDate = toCalendarDate(e) // Ensure it's CalendarDate
                onChange(calendarDateToString(calendarDate)) // Convert CalendarDate to string for form
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
