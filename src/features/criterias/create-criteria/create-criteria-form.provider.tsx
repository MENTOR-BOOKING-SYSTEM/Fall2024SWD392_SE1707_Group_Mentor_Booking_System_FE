import CreateCriteriaForm from './create-criteria-form'
import Button from '@/components/ui/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { PlusCircleIcon } from 'lucide-react'
import { FormProvider, SubmitHandler } from 'react-hook-form'
import { type CreateCriteriaFormValues, useCreateCriteria } from './use-create-criteria'

interface CreateCriteriaFormProviderProps {
  isDisabled: boolean
}

export default function CreateCriteriaFormProvider({ isDisabled }: CreateCriteriaFormProviderProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { methods, createCriteriaMutation } = useCreateCriteria(onClose)

  const onSubmit: SubmitHandler<CreateCriteriaFormValues> = (data) => {
    createCriteriaMutation.mutate(data)
  }

  return (
    <FormProvider {...methods}>
      <Button
        color='primary'
        onPress={onOpen}
        startContent={<PlusCircleIcon className='w-4 h-4' />}
        isDisabled={isDisabled}
      >
        Create criteria
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} className='modal-dialog'>
        <ModalContent>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ModalHeader className='flex flex-col gap-1'>Create criteria</ModalHeader>
            <ModalBody>
              <CreateCriteriaForm />
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Close
              </Button>
              <Button color='primary' type='submit' isLoading={createCriteriaMutation.isPending}>
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </FormProvider>
  )
}
