import Button from '@/components/ui/button'
import CreateAccountForm from './create-account-form'
import userService from '@/services/user.services'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { PlusCircleIcon } from 'lucide-react'
import { CreateAccountFormValues, useCreateAccount } from './use-create-account'
import { FormProvider, SubmitHandler } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { toaster } from '@/components/ui/toaster'
import { useCallback, useState } from 'react'
import { FileRejection } from 'react-dropzone'

interface CreateAccountFormProviderProps {
  isDisabled: boolean
}

export default function CreateAccountFormProvider({ isDisabled }: CreateAccountFormProviderProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { methods, createAccountMutation } = useCreateAccount()
  const [avatar, setAvatar] = useState('')

  const onSubmit: SubmitHandler<CreateAccountFormValues> = (data) => {
    // createAccountMutation.mutate(data)
    console.log(data)
  }

  const { mutate, isPending } = useMutation({
    mutationFn: userService.uploadFiles,
    onSuccess: (images) => {
      setAvatar(images[0].url)
      methods.setValue('avatarUrl', images[0].url)
    },
    onError: () => {
      toaster.error({ text: 'Failed to upload image' })
    }
  })

  const onDrop = useCallback(
    <T extends File>(acceptedFiles: T[], rejectedFiles: FileRejection[]) => {
      if (rejectedFiles.length) {
        return toaster.error({ text: 'Invalid file(s)' })
      }
      if (!acceptedFiles.length) return
      const file = acceptedFiles[0]
      const formData = new FormData()
      formData.append('image', file)
      mutate(formData)
    },
    [mutate]
  )

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
              <CreateAccountForm avatar={avatar} isPending={isPending} onDrop={onDrop} />
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
