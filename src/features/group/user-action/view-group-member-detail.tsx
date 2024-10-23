import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'

interface User {
  id: number
  name: string
  role: string
  team: string
  status: string
  age: string
  email: string
}

interface ViewGroupMemberDetailProps {
  isOpen: boolean
  onOpenChange: () => void
  user: User
}

export default function ViewGroupMemberDetail({ isOpen, onOpenChange, user }: ViewGroupMemberDetailProps) {
  return (
    <Modal size='xl' isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='flex flex-col gap-1'>{user.name}</ModalHeader>
            <ModalBody>
              <p>Email: {user.email}</p>
              <p>Vai trò: {user.role}</p>
              <p>Nhóm: {user.team}</p>
              <p>Tuổi: {user.age}</p>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='flat' onPress={onClose}>
                Đóng
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
