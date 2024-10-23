import Button from '@/components/ui/button'
import CreateAccountForm from './create-account-form'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { PlusCircleIcon } from 'lucide-react'
import { CreateAccountFormValues, useCreateAccount } from './use-create-account'
import { FormProvider, SubmitHandler } from 'react-hook-form'

interface CreateAccountFormProviderProps {
  isDisabled: boolean
}

export default function CreateAccountFormProvider({ isDisabled }: CreateAccountFormProviderProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { methods, createAccountMutation } = useCreateAccount()

  const onSubmit: SubmitHandler<CreateAccountFormValues> = (data) => {
    console.log(data)
  }

  console.log(methods.formState.errors)

  return (
    <FormProvider {...methods}>
      <Button
        color='primary'
        startContent={<PlusCircleIcon className='w-4 h-4' />}
        onPress={onOpen}
        isDisabled={isDisabled}
      >
        Create account
      </Button>
      <Modal className='max-w-[620px]' isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>Create account</ModalHeader>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ModalBody>
              <CreateAccountForm />
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                Close
              </Button>
              <Button color='primary' type='submit'>
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </FormProvider>
  )
}
