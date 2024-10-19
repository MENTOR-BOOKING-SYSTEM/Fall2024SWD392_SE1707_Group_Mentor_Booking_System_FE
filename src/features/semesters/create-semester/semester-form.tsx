import { DATE_FORMAT } from '@/constants'
import { Semester } from '@/models/semester.model'
import { formatDBDate } from '@/utils'
import { DateValue, parseDate } from '@internationalized/date'
import { DatePicker, Input, Textarea } from '@nextui-org/react'
import { format } from 'date-fns'
import { useMemo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { SemesterFormValues } from './use-create-semester'

interface SemesterFormProps {
  latestSemester?: Semester | null | undefined
  isEdit?: boolean
  isDisabledDate?: boolean
}

export default function SemesterForm({ latestSemester, isEdit, isDisabledDate }: SemesterFormProps) {
  const {
    control,
    getValues,
    watch,
    formState: { errors }
  } = useFormContext<SemesterFormValues>()

  const startDate = watch('startDate')

  const endDateMinValue = useMemo(() => {
    if (startDate) {
      return parseDate(formatDBDate({ date: getValues('startDate'), daysToAdd: 16 * 7 }))
    }
    return undefined
  }, [startDate])

  if (isEdit) {
    return (
      <div className='flex flex-col gap-3'>
        <Controller
          control={control}
          name='semesterName'
          render={({ field: { onChange, value } }) => (
            <Input
              label='Semester name'
              placeholder='Enter semester name'
              defaultValue={value}
              onChange={onChange}
              autoFocus
              errorMessage={errors.semesterName?.message}
              isInvalid={!!errors.semesterName}
              className='relative'
              isReadOnly={!isEdit}
            />
          )}
        />
        <Controller
          control={control}
          name='startDate'
          render={({ field: { onChange, value } }) => {
            return (
              <DatePicker
                label='Start date'
                minValue={
                  latestSemester ? parseDate(formatDBDate({ date: latestSemester.endDate, daysToAdd: 1 })) : undefined
                }
                onChange={(e) => {
                  const formattedDate = new Date(e.year, e.month - 1, e.day)
                  onChange(format(formattedDate, DATE_FORMAT.DATEPICKER))
                }}
                value={value ? parseDate(formatDBDate({ date: value })) : null}
                isReadOnly={!isEdit || isDisabledDate}
                showMonthAndYearPickers
              />
            )
          }}
        />
        <Controller
          control={control}
          name='endDate'
          render={({ field: { onChange, value } }) => {
            return (
              <DatePicker
                label='End date'
                minValue={endDateMinValue}
                onChange={(e: DateValue) => {
                  const formattedDate = new Date(e.year, e.month - 1, e.day)
                  onChange(format(formattedDate, DATE_FORMAT.DATEPICKER))
                }}
                value={value ? parseDate(formatDBDate({ date: value })) : null}
                isReadOnly={!isEdit || isDisabledDate}
                isDisabled={endDateMinValue === undefined}
                showMonthAndYearPickers
              />
            )
          }}
        />
        <Controller
          control={control}
          name='description'
          render={({ field: { onChange, value } }) => (
            <Textarea
              label='Description'
              placeholder={!isEdit ? 'No description available' : 'Enter description'}
              onChange={onChange}
              defaultValue={value}
              disableAnimation
              disableAutosize
              classNames={{
                input: 'resize-y min-h-24'
              }}
              isReadOnly={!isEdit}
            />
          )}
        />
      </div>
    )
  } else {
    return (
      <div className='flex flex-col gap-3'>
        <Controller
          control={control}
          name='semesterName'
          render={({ field: { value } }) => (
            <Input
              label='Semester name'
              placeholder='Enter semester name'
              defaultValue={value}
              errorMessage={errors.semesterName?.message}
              isInvalid={!!errors.semesterName}
              className='relative'
              isReadOnly={!isEdit}
            />
          )}
        />
        <div className='flex items-center gap-3'>
          <Controller
            control={control}
            name='startDate'
            render={({ field: { value } }) => {
              return (
                <DatePicker
                  label='Start date'
                  value={value ? parseDate(formatDBDate({ date: value })) : null}
                  isReadOnly={!isEdit || isDisabledDate}
                  showMonthAndYearPickers
                />
              )
            }}
          />
          <Controller
            control={control}
            name='endDate'
            render={({ field: { value } }) => {
              return (
                <DatePicker
                  label='End date'
                  value={value ? parseDate(formatDBDate({ date: value })) : null}
                  isReadOnly={!isEdit || isDisabledDate}
                  isDisabled={endDateMinValue === undefined}
                  showMonthAndYearPickers
                />
              )
            }}
          />
        </div>
        <Controller
          control={control}
          name='description'
          render={({ field: { value } }) => (
            <Textarea
              label='Description'
              placeholder={!isEdit ? 'No description available' : 'Enter description'}
              defaultValue={value}
              disableAnimation
              disableAutosize
              classNames={{
                input: 'resize-y min-h-24'
              }}
              isReadOnly={!isEdit}
            />
          )}
        />
      </div>
    )
  }
}
