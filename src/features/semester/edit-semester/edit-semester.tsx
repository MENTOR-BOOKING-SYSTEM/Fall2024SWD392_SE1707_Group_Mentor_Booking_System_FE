import { useState } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea,
  DatePicker
} from '@nextui-org/react'
import { EditIcon } from 'lucide-react'
import { useEditSemester } from './use-edit-semester'
import { Semester } from '@/models/semester.model'
import { DateValue, parseDate, CalendarDate } from '@internationalized/date'
import { addDays } from 'date-fns'

interface EditSemesterProps {
  semester: Semester
  allSemesters: Semester[]
}

//  convert DateValue to JavaScript Date object
const dateValueToDate = (dateValue: DateValue): Date => {
  return new Date(dateValue.year, dateValue.month, dateValue.day)
}

export default function EditSemester({ semester, allSemesters }: EditSemesterProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [semesterName, setSemesterName] = useState(semester.semesterName)
  const [startDate, setStartDate] = useState<DateValue>(parseDate(semester.startDate.split('T')[0]))
  const [endDate, setEndDate] = useState<DateValue>(parseDate(semester.endDate.split('T')[0]))
  const [description, setDescription] = useState(semester.description || '')

  const { editSemesterMutation } = useEditSemester()

  // Function to handle changes in startDate and automatically adjust endDate
  const handleStartDateChange = (newStartDate: DateValue) => {
    const previousSemester = allSemesters
      .filter((sem) => sem.semesterID !== semester.semesterID)
      .reduce((prev, current) => (prev.endDate > current.endDate ? prev : current), allSemesters[0])

    // Convert previous semester's end date to JavaScript Date object
    const prevSemesterEndDate = dateValueToDate(parseDate(previousSemester.endDate.split('T')[0]))

    // Ensure new startDate is greater than the previous semester's end date
    if (dateValueToDate(newStartDate) <= prevSemesterEndDate) {
      alert(`Start date must be after the end date of the previous semester (${previousSemester.endDate}).`)
      return
    }

    setStartDate(newStartDate)

    // Automatically set endDate to be 16 weeks after startDate
    const newEndDate = addDays(dateValueToDate(newStartDate), 16 * 7)
    setEndDate(parseDate(newEndDate.toISOString().split('T')[0])) // Update endDate to 16 weeks later
  }

  const handleEdit = () => {
    const updatedFields: Partial<Semester> = {}

    // Ensure semester name is unique
    const isSemesterNameUnique = !allSemesters.some(
      (sem) => sem.semesterName === semesterName && String(sem.semesterID) !== String(semester.semesterID)
    )

    if (!isSemesterNameUnique) {
      alert('The semester name already exists! Please choose a different name.')
      return
    }

    // Update semester fields
    if (semesterName !== semester.semesterName) {
      updatedFields.semesterName = semesterName
    }
    if (startDate.toString() !== semester.startDate.split('T')[0]) {
      updatedFields.startDate = startDate.toString()
    }
    if (endDate.toString() !== semester.endDate.split('T')[0]) {
      updatedFields.endDate = endDate.toString()
    }
    if (description !== semester.description) {
      updatedFields.description = description
    }

    // Trigger update mutation if there are changes
    if (Object.keys(updatedFields).length > 0) {
      editSemesterMutation.mutate(
        { semesterID: semester.semesterID, ...updatedFields },
        {
          onSuccess: () => {
            onOpenChange()
          }
        }
      )
    } else {
      onOpenChange()
    }
  }

  return (
    <>
      <EditIcon onClick={onOpen} className='w-5 h-5 stroke-1 cursor-pointer' />
      <Modal isDismissable={false} isOpen={isOpen} onOpenChange={onOpenChange} className='modal-dialog'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Edit Semester</ModalHeader>
              <ModalBody>
                <Input
                  type='text'
                  label='Semester Name'
                  value={semesterName}
                  onChange={(e) => setSemesterName(e.target.value)}
                />
                <div className='flex items-center gap-3'>
                  <DatePicker label='Start Date' value={startDate} onChange={(date) => handleStartDateChange(date)} />
                  <p className='text-sm mx-2'>to</p>
                  <DatePicker
                    label='End Date'
                    value={endDate}
                    // Restrict selection of endDate to be at least 16 weeks after startDate
                    minValue={
                      new CalendarDate(
                        addDays(new Date(startDate.year, startDate.month - 1, startDate.day), 16 * 7).getFullYear(),
                        addDays(new Date(startDate.year, startDate.month - 1, startDate.day), 16 * 7).getMonth() + 1,
                        addDays(new Date(startDate.year, startDate.month - 1, startDate.day), 16 * 7).getDate()
                      )
                    }
                    onChange={(date) => setEndDate(date)}
                  />
                </div>
                <Textarea label='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
              </ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  variant='light'
                  onPress={() => {
                    setDescription('')
                    onClose()
                  }}
                >
                  Close
                </Button>
                <Button color='primary' onPress={handleEdit}>
                  Edit
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
