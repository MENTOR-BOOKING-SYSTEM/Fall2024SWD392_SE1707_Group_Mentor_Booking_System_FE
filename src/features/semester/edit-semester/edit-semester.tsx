import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link
} from '@nextui-org/react'
import { EditIcon, MailIcon } from 'lucide-react'

export default function EditSemester() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <EditIcon onClick={onOpen} className='w-5 h-5 stroke-1 cursor-pointer' />
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'></ModalHeader>
              <ModalBody>
                <Input type='text' label='Semester' labelPlacement='outside' defaultValue='' />
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
