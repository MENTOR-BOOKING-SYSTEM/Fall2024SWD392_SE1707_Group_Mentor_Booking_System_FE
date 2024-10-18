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
import { format } from 'date-fns'
import { useViewCriterias } from '@/features/criterias/view-criterias/use-view-criterias'
import ViewCriteriasTable from '@/features/criterias/view-criterias/view-criterias-table'

interface ViewDetailSemesterProps {
  semester: Semester
}

export default function ViewDetailSemester({ semester }: ViewDetailSemesterProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const { data, isLoading } = useViewCriterias()
  const formatDate = (date: Date | string) => {
    return format(new Date(date), 'dd/MM/yyyy')
  }

  return (
    <>
      <EyeIcon onClick={onOpen} className='w-5 h-5 stroke-1 cursor-pointer' />
      <Modal isDismissable={false} size='4xl' isOpen={isOpen} onOpenChange={onOpenChange} className='modal-dialog'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Semester Detail</ModalHeader>
              <ModalBody>
                <Input label='Semester' value={semester.semesterName} isReadOnly />
                <div className='flex items-center gap-3'>
                  <Input label='Start Date' value={formatDate(semester.startDate)} isReadOnly />
                  <p className='text-sm mx-2'>to</p>
                  <Input label='End Date' value={formatDate(semester.endDate)} isReadOnly />
                </div>

                <Textarea label='Description' value={semester.description || ''} isReadOnly />
                <ViewCriteriasTable
                  data={data}
                  isLoading={isLoading}
                  visibleColumns={['criteriaID', 'criteriaName', 'description', 'type']}
                />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
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
