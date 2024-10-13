import { CalendarDate, getLocalTimeZone, today, DateValue } from '@internationalized/date'
import { useState } from 'react'
import { DatePicker } from '@nextui-org/date-picker'

export default function SetupTimeStamp() {
  const [semesterStart, setSemesterStart] = useState<DateValue | undefined>(today(getLocalTimeZone()) as DateValue)
  const [semesterEnd, setSemesterEnd] = useState<DateValue | undefined>(
    semesterStart ? (semesterStart as CalendarDate).add({ weeks: 14 }) : undefined
  )

  const [beforeSemesterStart, setBeforeSemesterStart] = useState<DateValue | undefined>(
    semesterStart ? (semesterStart as CalendarDate).subtract({ weeks: 4 }) : undefined
  )

  const [inSemesterEnd, setInSemesterEnd] = useState<DateValue | undefined>(
    semesterStart ? (semesterStart as CalendarDate).add({ weeks: 10 }) : undefined
  )

  const handleSemesterStartChange = (date: DateValue) => {
    setSemesterStart(date)
    setSemesterEnd((date as CalendarDate).add({ weeks: 14 }))
    setBeforeSemesterStart((date as CalendarDate).subtract({ weeks: 4 }))
    setInSemesterEnd((date as CalendarDate).add({ weeks: 10 }))
  }

  return (
    <div>
      <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
        <DatePicker
          label='Semester Start'
          isRequired
          labelPlacement='inside'
          minValue={today(getLocalTimeZone()) as DateValue}
          defaultValue={today(getLocalTimeZone()) as DateValue}
          onChange={(date) => handleSemesterStartChange(date as DateValue)}
        />

        <DatePicker
          label='Semester End'
          isRequired
          labelPlacement='inside'
          minValue={semesterStart ? (semesterStart as CalendarDate).add({ weeks: 14 }) : today(getLocalTimeZone())}
          value={semesterEnd}
          onChange={(date) => setSemesterEnd(date as DateValue)}
        />
      </div>

      <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
        <DatePicker
          label='Before Semester Start'
          labelPlacement='outside-left'
          minValue={beforeSemesterStart}
          maxValue={semesterStart}
          value={beforeSemesterStart}
          onChange={(date) => setBeforeSemesterStart(date as DateValue)}
        />

        <DatePicker
          label='Before Semester End'
          labelPlacement='outside-left'
          minValue={beforeSemesterStart}
          maxValue={semesterStart}
          value={semesterStart}
        />
      </div>

      <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
        <DatePicker
          label='In Semester Start'
          labelPlacement='outside-left'
          minValue={semesterStart}
          value={semesterStart}
          onChange={(date) => handleSemesterStartChange(date as DateValue)}
        />

        <DatePicker
          label='In Semester End'
          labelPlacement='outside-left'
          minValue={semesterStart}
          maxValue={inSemesterEnd}
          value={inSemesterEnd}
          onChange={(date) => setInSemesterEnd(date as DateValue)}
        />
      </div>
    </div>
  )
}
