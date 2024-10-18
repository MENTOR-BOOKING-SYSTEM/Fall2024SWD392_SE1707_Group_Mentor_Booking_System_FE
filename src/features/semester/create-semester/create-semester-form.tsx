import { useState, useEffect } from 'react'
import { useDisclosure, Input, Textarea } from '@nextui-org/react'
import { useFormContext, Controller } from 'react-hook-form'
import { CreateSemesterFormValues } from './use-create-semester'
import { DatePicker } from '@nextui-org/react'
import { CalendarDate, DateValue } from '@internationalized/date'
import { addDays } from 'date-fns'
import { Semester } from '@/models/semester.model'

const toCalendarDate = (value: DateValue): CalendarDate => {
  if ('hour' in value) {
    return new CalendarDate(value.year, value.month, value.day)
  }
  return value as CalendarDate
}

const calendarDateToString = (date: CalendarDate): string => {
  return `${date.year}-${date.month.toString().padStart(2, '0')}-${date.day.toString().padStart(2, '0')}`
}

interface CreateSemesterFormProps {
  latestSemester: Semester | null
}

export default function CreateSemesterForm({ latestSemester }: CreateSemesterFormProps) {
  const {
    control,
    setValue,
    reset,
    formState: { errors }
  } = useFormContext<CreateSemesterFormValues>()
  const { isOpen } = useDisclosure()

  const [semesterName, setSemesterName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [startDate, setStartDate] = useState<CalendarDate | null>(null)
  const [endDate, setEndDate] = useState<CalendarDate | null>(null)

  const calculateEndDateMinValue = (startDate: CalendarDate): CalendarDate => {
    const startJSDate = new Date(startDate.year, startDate.month - 1, startDate.day)
    const minEndDate = addDays(startJSDate, 16 * 7)
    return new CalendarDate(minEndDate.getFullYear(), minEndDate.getMonth() + 1, minEndDate.getDate())
  }

  useEffect(() => {
    if (isOpen) {
      setSemesterName('')
      setDescription('')
      setStartDate(null)
      setEndDate(null)
      reset({
        semesterName: '',
        description: '',
        startDate: '',
        endDate: ''
      })
    }
  }, [isOpen, reset])

  const handleStartDateChange = (e: DateValue) => {
    const calendarDate = toCalendarDate(e)
    setStartDate(calendarDate)

    const calculatedEndDate = calculateEndDateMinValue(calendarDate)
    setEndDate(calculatedEndDate)
    setValue('endDate', calendarDateToString(calculatedEndDate))
  }

  return (
    <div className='flex flex-col gap-3'>
      {/* Semester Name Input */}
      <Controller
        control={control}
        name='semesterName'
        render={({ field: { onChange } }) => (
          <Input
            onChange={(e) => {
              onChange(e)
              setSemesterName(e.target.value)
            }}
            value={semesterName}
            label='Semester name'
            placeholder='Enter semester name'
            autoFocus
            errorMessage={errors.semesterName?.message}
            isInvalid={!!errors.semesterName}
            className='relative'
          />
        )}
      />

      <div className='flex items-center gap-3'>
        {/* Start Date Picker */}
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
                handleStartDateChange(e)
              }}
              value={startDate || undefined}
              label='Start date'
            />
          )}
        />
        <p className='text-sm mx-2'>to</p>

        {/* End Date Picker */}
        <Controller
          control={control}
          name='endDate'
          render={({ field: { onChange } }) => (
            <DatePicker
              isDisabled={!startDate}
              value={endDate || undefined}
              minValue={startDate ? calculateEndDateMinValue(startDate) : undefined}
              onChange={(e: DateValue) => {
                const calendarDate = toCalendarDate(e)
                setEndDate(calendarDate)
                onChange(calendarDateToString(calendarDate))
              }}
              label='End date'
            />
          )}
        />
      </div>

      {/* Description Input */}
      <Controller
        control={control}
        name='description'
        render={({ field: { onChange } }) => (
          <Textarea
            value={description}
            label='Description'
            onChange={(e) => {
              onChange(e)
              setDescription(e.target.value)
            }}
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
