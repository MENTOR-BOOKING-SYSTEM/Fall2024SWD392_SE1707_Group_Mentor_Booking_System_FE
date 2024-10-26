import React from 'react'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Avatar } from '@nextui-org/react'

interface ViewGroupMemberDetailProps {
  isOpen: boolean
  onOpenChange: () => void
  member: {
    name: string
    position: string
    email: string
    avatarUrl: string | null
  }
}

export default function ViewGroupMemberDetail({ isOpen, onOpenChange, member }: ViewGroupMemberDetailProps) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader className='flex flex-col gap-1'>Member Detail</ModalHeader>
        <ModalBody>
          <div className='flex flex-col gap-2'>
            <Avatar src={member.avatarUrl || 'https://i.pravatar.cc/150?img=default'} className='w-20 h-20 mx-auto' />
            <p className='text-sm text-center'>{member.position}</p>
            <p className='text-lg font-semibold text-center'>{member.name}</p>
            <p className='text-wrap text-center'>{member.email}</p>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color='danger' variant='light' onPress={onOpenChange}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
