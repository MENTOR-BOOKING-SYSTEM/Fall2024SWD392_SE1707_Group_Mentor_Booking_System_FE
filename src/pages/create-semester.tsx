import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  DatePicker,
  Input
} from '@nextui-org/react'
import { useState } from 'react'
import { DateValue } from '@react-types/datepicker'
import { getLocalTimeZone, today } from '@internationalized/date'

const App: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [semesterName, setSemesterName] = useState('')
  const [startDate, setStartDate] = useState<DateValue | null>(null)
  const [endDate, setEndDate] = useState<DateValue | null>(null)
  const [description, setDescription] = useState<string | null>('')

  const handleCreate = () => {
    // Kiểm tra nếu tên học kỳ là duy nhất
    if (!semesterName) {
      alert('Need Semester Name')
      return
    }

    if (startDate && endDate) {
      const start = new Date(startDate.year, startDate.month - 1, startDate.day)
      const end = new Date(endDate.year, endDate.month - 1, endDate.day)
      const diffInWeeks = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 7)
      if (diffInWeeks !== 16) {
        alert('Start Date and End Date must have 16 weeks period')
        return
      }
    } else {
      alert('Must have Start Date and End Date')
      return
    }

    console.log({
      semesterName,
      startDate,
      endDate,
      description: description || null
    })
    onOpenChange()
  }

  return (
    <>
      <Button onPress={onOpen} color='primary'>
        Add Semester
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='xl' placement='top-center'>
        <ModalContent>
          {(onClose: () => void) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Add New Semester</ModalHeader>
              <ModalBody>
                <Input
                  type='text'
                  label='Semester Name'
                  labelPlacement='outside'
                  isRequired
                  placeholder='Enter name'
                  value={semesterName}
                  onChange={(e) => setSemesterName(e.target.value)}
                />
                <div className='w-full max-w-xl flex flex-row gap-4'>
                  <div className='w-full flex flex-col gap-1'>
                    <DatePicker
                      label='Start Date'
                      labelPlacement='outside'
                      isRequired
                      showMonthAndYearPickers
                      minValue={today(getLocalTimeZone())}
                      onChange={(date: DateValue) => setStartDate(date)}
                    />
                  </div>
                  <div className='w-full flex flex-col gap-1'>
                    <DatePicker
                      label='End Date'
                      labelPlacement='outside'
                      isRequired
                      showMonthAndYearPickers
                      minValue={today(getLocalTimeZone())}
                      onChange={(date: DateValue) => setEndDate(date)}
                    />
                  </div>
                </div>
                <Input
                  type='text'
                  label='Description'
                  placeholder='Enter semester description (optional)'
                  labelPlacement='outside'
                  value={description || ''}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={handleCreate}>
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default App
