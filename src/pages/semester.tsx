import { DatePicker } from '@nextui-org/react'
import { CalendarDate, parseDate, getLocalTimeZone, today } from '@internationalized/date'
export default function App() {
  return (
    <div className='flex w-full flex-col gap-4'>
      <div className='flex w-full flex-wrap md:flex-nowrap mb-6 md:mb-0 gap-4'>
        <DatePicker
          label='Semester Start'
          isRequired
          placeholderValue={new CalendarDate(1995, 11, 6)}
          labelPlacement='inside'
          minValue={today(getLocalTimeZone()) as CalendarDate}
          defaultValue={today(getLocalTimeZone()).subtract({ days: 0 }) as CalendarDate}
        />
        <DatePicker
          label='Semester End'
          isRequired
          placeholderValue={new CalendarDate(1995, 11, 6)}
          labelPlacement='inside'
          minValue={today(getLocalTimeZone()) as CalendarDate}
          defaultValue={today(getLocalTimeZone()).subtract({ days: 0 }) as CalendarDate}
        />
      </div>
    </div>
  )
}
