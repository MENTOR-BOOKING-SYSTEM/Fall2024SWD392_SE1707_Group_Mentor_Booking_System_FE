import Button from './button'
import { ModalBody, ModalContent, ModalFooter, ModalHeader, Modal as NextModal, useDisclosure } from '@nextui-org/react'
import { FieldValues, FormProvider, SubmitHandler, UseFormReturn } from 'react-hook-form'

interface ModalProps<T extends FieldValues> {
  header?: string
  body: React.ReactNode
  footer?: React.ReactNode
  children: React.ReactNode
  onSubmit?: SubmitHandler<T>
  methods?: UseFormReturn<T>
}

export interface ModalRef {
  onClose: () => void
}

export default function Modal<T extends FieldValues>({
  header,
  body,
  footer,
  children,
  methods,
  onSubmit
}: ModalProps<T>) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()

  const handleClose = () => {
    onClose()
    if (methods) {
      methods.reset()
    }
  }

  const content = methods ? (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit ? methods.handleSubmit(onSubmit) : undefined}>
        <ModalBody>{body}</ModalBody>
        <ModalFooter>
          {footer || (
            <>
              <Button color='danger' variant='flat' onPress={handleClose}>
                Close
              </Button>
              <Button color='primary' type='submit'>
                Save
              </Button>
            </>
          )}
        </ModalFooter>
      </form>
    </FormProvider>
  ) : (
    <>
      <ModalBody>{body}</ModalBody>
      <ModalFooter>
        {footer || (
          <Button color='primary' onPress={onClose}>
            Close
          </Button>
        )}
      </ModalFooter>
    </>
  )

  return (
    <>
      <div onClick={onOpen}>{children}</div>
      <NextModal
        className='modal-dialog'
        backdrop='blur'
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement='top-center'
      >
        <ModalContent>
          <>
            <ModalHeader className='flex flex-col gap-1'>{header}</ModalHeader>
            {content}
          </>
        </ModalContent>
      </NextModal>
    </>
  )
}
