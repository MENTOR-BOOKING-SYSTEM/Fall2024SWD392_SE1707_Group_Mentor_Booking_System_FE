import Button from './button'
import {
  Modal as NextModal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Checkbox,
  Input,
  Link
} from '@nextui-org/react'

export default function Modal({ children }: { children: React.ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button onPress={onOpen} color='primary'>
        {children}
      </Button>
      <NextModal backdrop='blur' isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Log in</ModalHeader>
              <ModalBody>
                <Input autoFocus label='Email' placeholder='Enter your email' variant='bordered' />
                <Input label='Password' placeholder='Enter your password' type='password' variant='bordered' />
                <div className='flex py-2 px-1 justify-between'>
                  <Checkbox
                    classNames={{
                      label: 'text-small'
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color='primary' href='#' size='sm'>
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={onClose}>
                  Close
                </Button>
                <Button color='primary' onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </NextModal>
    </>
  )
}