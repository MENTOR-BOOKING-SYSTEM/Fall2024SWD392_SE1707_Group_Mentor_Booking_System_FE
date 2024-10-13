import { DatePicker } from '@nextui-org/react'
import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date'

interface BeforeSemesterProps {
  semesterStart: CalendarDate | null
  semesterEnd: CalendarDate | null
  handleSemesterStartChange: (date: CalendarDate) => void
  setSemesterEnd: (date: CalendarDate) => void
}

const BeforeSemester: React.FC<BeforeSemesterProps> = ({
  semesterStart,
  semesterEnd,
  handleSemesterStartChange,
  setSemesterEnd
}) => {
  return (
    <div className='mb-3 flex w-full flex-col gap-4 '>
      <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
        <DatePicker
          label='Before Semester Start'
          isRequired
          placeholderValue={new CalendarDate(1995, 11, 6)}
          labelPlacement='inside'
          minValue={today(getLocalTimeZone()) as CalendarDate}
          defaultValue={today(getLocalTimeZone()) as CalendarDate}
          onChange={(date) => handleSemesterStartChange(date as CalendarDate)}
        />

        <DatePicker
          label='Before Semester End'
          isRequired
          placeholderValue={new CalendarDate(1995, 11, 6)}
          labelPlacement='inside'
          minValue={semesterStart ? semesterStart.add({ weeks: 14 }) : today(getLocalTimeZone())}
          value={semesterEnd}
          onChange={(date) => setSemesterEnd(date as CalendarDate)}
        />
      </div>
    </div>
  )
}

export default BeforeSemester
