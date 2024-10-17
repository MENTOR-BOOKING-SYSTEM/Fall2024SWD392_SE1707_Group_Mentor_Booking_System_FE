import {
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea
} from '@nextui-org/react'
import { EyeIcon } from 'lucide-react'
import { Semester } from '@/models/semester.model'

interface ViewDetailSemesterProps {
  semester: Semester
}

export default function ViewDetailSemester({ semester }: ViewDetailSemesterProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <EyeIcon onClick={onOpen} className='w-5 h-5 stroke-1 cursor-pointer' />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='modal-dialog'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Semester Detail</ModalHeader>
              <ModalBody>
                <Input label='Semester' value={semester.semesterName} isReadOnly />
                <div className='flex items-center gap-3'>
                  <Input
                    label='Start Date'
                    value={new Date(semester.startDate).toLocaleDateString('vi-VN')}
                    isReadOnly
                  />
                  <p className='text-sm mx-2'>to</p>
                  <Input label='End Date' value={new Date(semester.endDate).toLocaleDateString('vi-VN')} isReadOnly />
                </div>

                <Textarea label='Description' value={semester.description || ''} isReadOnly />
              </ModalBody>
              <ModalFooter>
                <Button color='primary' onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
