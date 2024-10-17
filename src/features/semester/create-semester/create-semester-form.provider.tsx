import Button from '@/components/ui/button'
import CreateSemesterForm from './create-semester-form'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react'
import { PlusCircleIcon } from 'lucide-react'
import { CreateSemesterFormValues, useCreateSemester } from './use-create-semester'
import { FormProvider, SubmitHandler } from 'react-hook-form'
import { Semester } from '@/models/semester.model'

interface CreateSemesterFormProviderProps {
  latestSemester: Semester | null
  isDisabled: boolean
}

export default function CreateSemesterFormProvider({ latestSemester, isDisabled }: CreateSemesterFormProviderProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { methods, createSemesterMutation } = useCreateSemester(onClose)

  const onSubmit: SubmitHandler<CreateSemesterFormValues> = (data) => {
    createSemesterMutation.mutate(data)
  }

  return (
    <FormProvider {...methods}>
      <Button
        color='primary'
        startContent={<PlusCircleIcon className='w-4 h-4' />}
        onPress={onOpen}
        isDisabled={isDisabled}
      >
        Create semester
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='modal-dialog'>
        <ModalContent>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ModalHeader className='flex flex-col gap-1'>Create semester</ModalHeader>
            <ModalBody>
              <CreateSemesterForm latestSemester={latestSemester} />
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Close
              </Button>
              <Button color='primary' type='submit' isLoading={createSemesterMutation.isPending}>
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </FormProvider>
  )
}
