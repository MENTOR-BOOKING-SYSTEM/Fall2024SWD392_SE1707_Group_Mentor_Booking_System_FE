import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@nextui-org/react'

interface User {
  userId: number
  name: string
  role: string
  team: string
  email: string
  avatarUrl: string | null
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
            <ModalHeader className='flex flex-col gap-1'>
              <img
                className='w-10 h-10 rounded-full mr-3'
                src={user.avatarUrl || 'https://i.pravatar.cc/150?img=default'}
                alt='Avatar'
              />
              {user.name}
            </ModalHeader>
            <ModalBody>
              <p>ID: {user.userId}</p>
              <p>Email: {user.email}</p>
              <p>Position: {user.role}</p>
              <p>GroupName: {user.team}</p>
            </ModalBody>
            <ModalFooter>
              <Button color='danger' variant='light' onPress={onClose}>
                CLose
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
