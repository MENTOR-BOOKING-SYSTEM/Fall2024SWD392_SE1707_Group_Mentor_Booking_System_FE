import { DatePicker } from '@nextui-org/react'
import { DateValue } from '@react-types/datepicker'

interface DatePickerFieldProps {
  label: string
  onChange: (date: DateValue) => void
  minValue?: DateValue
  value: DateValue | null
}

const DatePickerField: React.FC<DatePickerFieldProps> = ({ label, onChange, minValue, value }) => {
  return (
    <div className='w-full flex flex-col gap-1'>
      <DatePicker
        label={label}
        labelPlacement='outside'
        isRequired
        showMonthAndYearPickers
        minValue={minValue}
        onChange={onChange}
        value={value}
      />
    </div>
  )
}

export default DatePickerField
