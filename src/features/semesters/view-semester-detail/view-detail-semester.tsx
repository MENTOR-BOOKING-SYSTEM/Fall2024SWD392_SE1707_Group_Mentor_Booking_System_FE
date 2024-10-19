import Button from '@/components/ui/button'
import SemesterForm from '../create-semester/semester-form'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner, useDisclosure } from '@nextui-org/react'
import { EditIcon, EyeIcon } from 'lucide-react'
import { useEditSemesterDetail, useViewSemesterDetail } from './use-view-semester-detail'
import { FormProvider, SubmitHandler } from 'react-hook-form'
import { SemesterFormValues } from '../create-semester/use-create-semester'
import ShouldRender from '@/components/shared/should-render'

interface ViewDetailSemesterProps {
  semesterID: number | undefined
  isEdit?: boolean
}

export default function ViewSemesterDetail({ semesterID, isEdit }: ViewDetailSemesterProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { data, isLoading, refetch } = useViewSemesterDetail(semesterID)
  const { methods, editSemesterMutation } = useEditSemesterDetail(data, onClose)

  const handleOpenModal = () => {
    refetch().then(() => {
      onOpen()
    })
  }

  const onSubmit: SubmitHandler<SemesterFormValues> = (data) => {
    editSemesterMutation.mutate({ semesterID: semesterID as number, semester: data })
  }

  return (
    <FormProvider {...methods}>
      <ShouldRender
        condition={isEdit}
        fallback={<EyeIcon onClick={handleOpenModal} className='w-5 h-5 stroke-1 cursor-pointer' />}
      >
        <EditIcon onClick={handleOpenModal} className='w-5 h-5 stroke-1 cursor-pointer' />
      </ShouldRender>
      <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} className='modal-dialog'>
        <ModalContent>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ModalHeader className='flex flex-col gap-1'>{isEdit ? 'Edit semester' : 'Semester detail'}</ModalHeader>
            <ModalBody>
              {isLoading ? (
                <Spinner />
              ) : (
                <ShouldRender condition={isEdit} fallback={<SemesterForm />}>
                  <SemesterForm isEdit isDisabledDate />
                </ShouldRender>
              )}
              <ShouldRender condition={!isEdit} fallback={null}>
                Timestamp detail
              </ShouldRender>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' isLoading={editSemesterMutation.isPending} onPress={onClose}>
                Close
              </Button>
              <ShouldRender condition={isEdit} fallback={null}>
                <Button
                  color='primary'
                  type='submit'
                  isLoading={editSemesterMutation.isPending}
                  isDisabled={!methods.formState.isDirty}
                >
                  Save
                </Button>
              </ShouldRender>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </FormProvider>
  )
}
