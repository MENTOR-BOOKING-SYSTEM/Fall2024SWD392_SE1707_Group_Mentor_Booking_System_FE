import Button from '@/components/ui/button'
import EditAccountDetailForm from '@/features/dashboard/edit-account-detail/edit-account-detail-form'
import ViewAccountDetail from '@/features/dashboard/view-account-detail/view-account-detail'
import userService from '@/services/user.services'
import { toaster } from '@/components/ui/toaster'
import {
  EditAccountDetailFormValues,
  useEditAccountDetail
} from '@/features/dashboard/edit-account-detail/use-edit-account-detail'
import { useViewAccountDetail } from '@/features/dashboard/view-account-detail/use-view-account-detail'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { useMutation } from '@tanstack/react-query'
import { EditIcon, EyeIcon } from 'lucide-react'
import { useCallback } from 'react'
import { FileRejection } from 'react-dropzone'
import { FormProvider, SubmitHandler } from 'react-hook-form'

interface AccountActionsProps {
  userID: number | undefined
  semesterID: number | undefined
  isEdit?: boolean
  page: number
}

export default function AccountActions({ userID, semesterID, isEdit, page }: AccountActionsProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { data, refetch } = useViewAccountDetail(String(semesterID), String(userID))
  const { methods, editAccountMutation, avatar, setAvatar } = useEditAccountDetail(data, page, semesterID, onClose)

  const onSubmit: SubmitHandler<EditAccountDetailFormValues> = (data) => {
    editAccountMutation.mutate({ userID: String(userID), account: data, semesterID })
  }

  const handleOpenModal = () => {
    refetch().then(() => {
      onOpen()
    })
  }

  const { mutate } = useMutation({
    mutationFn: userService.uploadFiles,
    onSuccess: (images) => {
      setAvatar(images[0].url)
      methods.setValue('avatarUrl', images[0].url, { shouldDirty: true })
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
      {isEdit ? (
        <EditIcon onClick={handleOpenModal} className='w-5 h-5 stroke-1 cursor-pointer' />
      ) : (
        <EyeIcon onClick={handleOpenModal} className='w-5 h-5 stroke-1 cursor-pointer' />
      )}
      <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} className='modal-dialog max-w-[620px]'>
        <ModalContent>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ModalHeader className='flex flex-col gap-1'>Account detail</ModalHeader>
            <ModalBody>
              {isEdit ? (
                <EditAccountDetailForm avatar={avatar} onDrop={onDrop} />
              ) : (
                <ViewAccountDetail account={data} />
              )}
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' isLoading={editAccountMutation.isPending} onPress={onClose}>
                Close
              </Button>
              {isEdit ? (
                <Button
                  color='primary'
                  type='submit'
                  isLoading={editAccountMutation.isPending}
                  isDisabled={!methods.formState.isDirty}
                >
                  Save
                </Button>
              ) : null}
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </FormProvider>
  )
}
