import SemesterForm from '../create-semester/semester-form'
import ViewSemesterTimestamps from '../view-semester-timestamps/view-semester-timestamps'
import ShouldRender from '@/components/shared/should-render'
import Button from '@/components/ui/button'
import ViewSemesterCriteria from '../view-semester-criterias/view-semester-criterias'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Tab,
  Tabs,
  useDisclosure
} from '@nextui-org/react'
import { EditIcon, EyeIcon } from 'lucide-react'
import { FormProvider, SubmitHandler } from 'react-hook-form'
import { SemesterFormValues } from '../create-semester/use-create-semester'
import { useEditSemesterDetail, useViewSemesterDetail } from './use-view-semester-detail'
import { cn } from '@/utils'

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
      <Modal
        backdrop='blur'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className={cn('modal-dialog', isEdit ? '' : 'max-w-screen-xl')}
      >
        <ModalContent>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ModalHeader className='flex flex-col gap-1'>{isEdit ? 'Edit semester' : 'Semester detail'}</ModalHeader>
            <ModalBody className='max-h-[40rem] overflow-y-auto'>
              {isLoading ? (
                <Spinner />
              ) : (
                <ShouldRender condition={isEdit} fallback={<SemesterForm />}>
                  <SemesterForm isEdit isDisabledDate />
                </ShouldRender>
              )}
              <ShouldRender condition={!isEdit} fallback={null}>
                <Tabs color='primary' aria-label='Options' className='mx-auto'>
                  <Tab key='timestamps' title='Timestamps'>
                    <ViewSemesterTimestamps semesterID={semesterID} />
                  </Tab>
                  <Tab key='approval-criterias' title='Approval Criterias'>
                    <ViewSemesterCriteria semesterID={semesterID} />
                  </Tab>
                </Tabs>
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
