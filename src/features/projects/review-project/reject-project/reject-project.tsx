import Button from '@/components/ui/button'
import { Criteria } from '@/models/criteria.model'
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@nextui-org/modal'
import { CircleX } from 'lucide-react'
import { Controller, SubmitHandler, useFormContext } from 'react-hook-form'
import { ReviewProjectFormValues } from '../use-review-project'
import { Checkbox, CheckboxGroup } from '@nextui-org/checkbox'
import { getColor, getStatus } from '@/features/criterias/view-criterias/utils/criteria.util'
import { cn } from '@/utils'
import { Chip } from '@nextui-org/chip'

interface RejectProjectProps {
  criterias: Criteria[] | null | undefined
}

export default function RejectProject({ criterias }: RejectProjectProps) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useFormContext<ReviewProjectFormValues>()
  console.log(errors)
  const onSubmit: SubmitHandler<ReviewProjectFormValues> = (data) => {
    console.log(data)
  }

  return (
    <div>
      <Button color='danger' variant='bordered' startContent={<CircleX />} onPress={onOpen}>
        Reject
      </Button>
      <Modal
        backdrop='blur'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className='modal-dialog max-h-[600px] min-w-[1200px]'
      >
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>Choose criterias</ModalHeader>
          <ModalBody className='overflow-auto'>
            <Controller
              control={control}
              name='criteriaID'
              render={({ field: { onChange, value } }) => {
                return (
                  <CheckboxGroup className='overflow-auto' value={value || []} onValueChange={onChange}>
                    {criterias
                      ?.filter((c) => parseInt(c.type) !== 1)
                      ?.map((criteria) => {
                        const status = getStatus(String(criteria.type))

                        return (
                          <Checkbox
                            key={criteria.criteriaID}
                            classNames={{
                              base: cn(
                                'inline-flex min-w-full bg-content1 m-0',
                                'hover:bg-content2 items-center justify-start',
                                'cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent',
                                'data-[selected=true]:border-primary'
                              ),
                              label: 'w-full'
                            }}
                            aria-label={criteria.criteriaName}
                            value={String(criteria.criteriaID)}
                          >
                            <div className='w-full flex justify-between gap-2'>
                              <div className='flex flex-col gap-1'>
                                <p className='font-bold'>{criteria.criteriaName}</p>
                                <p className='text-sm'>{criteria.description}</p>
                              </div>
                              <Chip color={getColor(status)} variant='flat'>
                                {status}
                              </Chip>
                            </div>
                          </Checkbox>
                        )
                      })}
                  </CheckboxGroup>
                )
              }}
            />
          </ModalBody>
          <ModalFooter>
            <Button color='danger' variant='light' onPress={onClose}>
              Close
            </Button>
            <Button color='danger' onClick={handleSubmit(onSubmit)} startContent={<CircleX />}>
              Reject
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
