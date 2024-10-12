import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'
import { useState } from 'react'
import SeStartEnd from '@/features/semester/se-start-end'

export default function SetupTimeStamp() {
  const [semesterStart, setSemesterStart] = useState<CalendarDate | null>(today(getLocalTimeZone()) as CalendarDate)
  const [semesterEnd, setSemesterEnd] = useState<CalendarDate | null>(
    semesterStart ? semesterStart.add({ weeks: 14 }) : null
  )

  const handleSemesterStartChange = (date: CalendarDate) => {
    setSemesterStart(date)
    setSemesterEnd(date.add({ weeks: 14 }))
  }

  return (
    <div>
      <SeStartEnd
        semesterStart={semesterStart}
        semesterEnd={semesterEnd}
        handleSemesterStartChange={handleSemesterStartChange}
        setSemesterEnd={setSemesterEnd}
      />
    </div>
  )
}
