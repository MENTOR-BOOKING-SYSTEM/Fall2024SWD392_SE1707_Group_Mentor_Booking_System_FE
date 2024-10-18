import { useState, useEffect } from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea
} from '@nextui-org/react'
import { EditIcon } from 'lucide-react'
import { useEditSemester } from './use-edit-semester'
import { Semester } from '@/models/semester.model'

const formatDate = (date: Date): string => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
  return `${day}/${month}/${year}`
}

const correctDate = (dateString: string): Date => {
  const date = new Date(dateString)
  date.setDate(date.getDate() + 1)
  return date
}

interface EditSemesterProps {
  semester: Semester
  allSemesters: Semester[]
}

export default function EditSemester({ semester, allSemesters }: EditSemesterProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const [semesterName, setSemesterName] = useState(semester.semesterName)
  const [startDate, setStartDate] = useState<Date>(correctDate(semester.startDate.split('T')[0]))
  const [endDate, setEndDate] = useState<Date>(correctDate(semester.endDate.split('T')[0]))
  const [description, setDescription] = useState(semester.description || '')

  const { editSemesterMutation } = useEditSemester()

  // Reset form fields when modal opens
  useEffect(() => {
    if (isOpen) {
      setSemesterName(semester.semesterName)
      setStartDate(correctDate(semester.startDate.split('T')[0]))
      setEndDate(correctDate(semester.endDate.split('T')[0]))
      setDescription(semester.description || '')
    }
  }, [isOpen, semester])

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
    if (description !== semester.description) {
      updatedFields.description = description
    }

    // Trigger update mutation if there are changes
    if (Object.keys(updatedFields).length > 0) {
      editSemesterMutation.mutate(
        { semesterID: semester.semesterID, ...updatedFields },
        {
          onSuccess: () => {
            onOpenChange() // Close modal after successful update
          }
        }
      )
    } else {
      onOpenChange() // Close modal without saving if there are no changes
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
                  {/* để thành input disable để giữ UI */}
                  <Input label='Start Date' value={formatDate(startDate)} isDisabled={true} />
                  <p className='text-sm mx-2'>to</p>
                  <Input label='End Date' value={formatDate(endDate)} isDisabled={true} />
                </div>
                <Textarea label='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
              </ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  variant='light'
                  onPress={() => {
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
