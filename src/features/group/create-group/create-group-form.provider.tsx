import Button from '@/components/ui/button'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { PlusCircleIcon } from 'lucide-react'
import { FormProvider, SubmitHandler } from 'react-hook-form'
import { useCreateGroup, type GroupFormValues } from './use-create-group'
import CreateGroupForm from './create-group-form'

interface CreateGroupFormProviderProps {
  isDisabled: boolean
}
export default function CreateGroupFormProvider({ isDisabled }: CreateGroupFormProviderProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { methods, createGroupMutation } = useCreateGroup(onClose)

  const onSubmit: SubmitHandler<GroupFormValues> = (data) => {
    createGroupMutation.mutate({ groupName: data.groupName, usersID: data.usersID })
  }

  return (
    <FormProvider {...methods}>
      <Button
        color='primary'
        onPress={onOpen}
        startContent={<PlusCircleIcon className='w-4 h-4' />}
        isDisabled={isDisabled}
      >
        Create Group
      </Button>
      <Modal backdrop='blur' size='5xl' isOpen={isOpen} onOpenChange={onOpenChange} className='modal-dialog'>
        <ModalContent>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ModalHeader className='flex flex-col gap-1'>Create Group</ModalHeader>
            <ModalBody className='h-[30rem] overflow-y-auto'>
              <CreateGroupForm />
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' isLoading={createGroupMutation.isPending} onPress={onClose}>
                Close
              </Button>
              <Button color='primary' type='submit' isLoading={createGroupMutation.isPending}>
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </FormProvider>
  )
}
