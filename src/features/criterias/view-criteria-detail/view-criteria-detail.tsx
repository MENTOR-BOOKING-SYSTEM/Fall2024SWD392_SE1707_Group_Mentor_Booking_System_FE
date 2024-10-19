import Button from '@/components/ui/button'
import CreateCriteriaForm from '../create-criteria/create-criteria-form'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { EditIcon, EyeIcon } from 'lucide-react'
import { useEditCriteriaDetail, useViewCriteriaDetail } from './use-view-criteria-detail'
import { Spinner } from '@nextui-org/react'
import { FormProvider, SubmitHandler } from 'react-hook-form'
import { CriteriaFormValues } from '../create-criteria/use-create-criteria'

interface ViewCriteriaDetailProps {
  criteriaID: number | undefined
  isEdit?: boolean
}

export default function ViewCriteriaDetail({ criteriaID, isEdit }: ViewCriteriaDetailProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const { data, isLoading, refetch } = useViewCriteriaDetail(criteriaID)
  const { methods, editCriteriaMutation } = useEditCriteriaDetail(data, onClose)
  // TODO: delete my own Modal component and use the NextUI Modal component

  const handleOpenModal = () => {
    refetch().then(() => {
      onOpen()
    })
  }

  const onSubmit: SubmitHandler<CriteriaFormValues> = (data) => {
    editCriteriaMutation.mutate({ criteriaID: criteriaID as number, criteria: data })
  }

  return (
    <FormProvider {...methods}>
      {isEdit ? (
        <EditIcon onClick={handleOpenModal} className='w-5 h-5 stroke-1 cursor-pointer' />
      ) : (
        <EyeIcon onClick={handleOpenModal} className='w-5 h-5 stroke-1 cursor-pointer' />
      )}
      <Modal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} className='modal-dialog'>
        <ModalContent>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <ModalHeader className='flex flex-col gap-1'>Criteria detail</ModalHeader>
            <ModalBody>
              {isLoading ? <Spinner /> : isEdit ? <CreateCriteriaForm /> : <CreateCriteriaForm isDisabled />}
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' isLoading={editCriteriaMutation.isPending} onPress={onClose}>
                Close
              </Button>
              {isEdit ? (
                <Button
                  color='primary'
                  type='submit'
                  isLoading={editCriteriaMutation.isPending}
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
