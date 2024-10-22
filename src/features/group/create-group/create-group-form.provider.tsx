import Button from '@/components/ui/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { PlusCircleIcon } from 'lucide-react'
import { FormProvider, SubmitHandler } from 'react-hook-form'
import { useCreateCriteria, type CriteriaFormValues } from '@/features/criterias/create-criteria/use-create-criteria'
import CreateGroupForm from './create-group-form'
import GroupForm from './group-form'

interface CreateGroupFormProviderProps {
  isDisabled: boolean
}

export default function CreateGroupFormProvider({ isDisabled }: CreateGroupFormProviderProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { methods, createCriteriaMutation } = useCreateCriteria(onClose)

  const onSubmit: SubmitHandler<CriteriaFormValues> = (data) => {
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
        Create group
      </Button>
      <Modal backdrop='blur' size='5xl' isOpen={isOpen} onOpenChange={onOpenChange} className='modal-dialog'>
        <ModalContent>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ModalHeader className='flex flex-col gap-1'>Create group</ModalHeader>
            <ModalBody className='h-[30rem] overflow-y-auto'>
              <div className='flex space-x-8'>
                <CreateGroupForm />
                <GroupForm />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' isLoading={createCriteriaMutation.isPending} onPress={onClose}>
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
