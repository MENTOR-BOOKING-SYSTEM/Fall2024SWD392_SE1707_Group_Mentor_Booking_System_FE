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

import { DateValue, parseDate } from '@internationalized/date'

interface EditSemesterProps {
  semester: Semester
}

export default function EditSemester({ semester }: EditSemesterProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [semesterName, setSemesterName] = useState(semester.semesterName)
  const [startDate, setStartDate] = useState<DateValue>(parseDate(semester.startDate.split('T')[0]))
  const [endDate, setEndDate] = useState<DateValue>(parseDate(semester.endDate.split('T')[0]))
  const [description, setDescription] = useState(semester.description || '')

  const { editSemesterMutation } = useEditSemester()

  const handleEdit = () => {
    const updatedFields: Partial<Semester> = {}

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
                  <DatePicker label='Start Date' value={startDate} onChange={(date) => setStartDate(date)} />
                  <p className='text-sm mx-2'>to</p>
                  <DatePicker label='End Date' value={endDate} onChange={(date) => setEndDate(date)} />
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
