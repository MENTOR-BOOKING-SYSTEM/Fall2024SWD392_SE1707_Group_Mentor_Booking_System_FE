import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from '@nextui-org/react'
import { DateValue } from '@react-types/datepicker'
import { getLocalTimeZone, today } from '@internationalized/date'
import DatePickerField from './date-picker-feild'

interface SemesterModalProps {
  isOpen: boolean
  onOpenChange: () => void
  semesterName: string
  setSemesterName: (value: string) => void
  startDate: DateValue | null
  setStartDate: (value: DateValue) => void
  endDate: DateValue | null
  setEndDate: (value: DateValue) => void
  description: string | null
  setDescription: (value: string) => void
  handleCreate: () => void
}

const SemesterModal: React.FC<SemesterModalProps> = ({
  isOpen,
  onOpenChange,
  semesterName,
  setSemesterName,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  description,
  setDescription,
  handleCreate
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} size='xl' placement='top-center'>
      <ModalContent>
        {(onClose: () => void) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>Create Semester</ModalHeader>
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
                <DatePickerField
                  label='Start Date'
                  minValue={today(getLocalTimeZone())}
                  onChange={setStartDate}
                  value={startDate}
                />
                <DatePickerField
                  label='End Date'
                  minValue={startDate || today(getLocalTimeZone())}
                  onChange={setEndDate}
                  value={endDate}
                />
              </div>
              <Input
                type='text'
                label='Description'
                placeholder='Enter description (option)'
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
  )
}

export default SemesterModal
