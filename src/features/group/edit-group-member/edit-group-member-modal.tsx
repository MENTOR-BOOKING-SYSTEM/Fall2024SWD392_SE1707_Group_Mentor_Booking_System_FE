import React from 'react'
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Avatar
} from '@nextui-org/react'
import { EditIcon } from 'lucide-react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import groupService from '@/services/group.services'
import { toaster } from '@/components/ui/toaster'

interface EditGroupMemberModalProps {
  member: {
    userID: number
    name: string
    position: string
    email: string
    avatarUrl: string | null
  }
  groupID: number
  onSuccess: () => void
  isCurrentUserLeader: boolean
}

export default function EditGroupMemberModal({
  member,
  groupID,
  onSuccess,
  isCurrentUserLeader
}: EditGroupMemberModalProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const queryClient = useQueryClient()

  const removeMemberMutation = useMutation({
    mutationFn: () => groupService.removeMember(groupID, member.userID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group-members', groupID] })
      toaster.success({ text: 'Member removed successfully' })
      onOpenChange()
      onSuccess()
    },
    onError: () => {
      toaster.error({ text: 'Cannot remove member' })
    }
  })

  const assignLeaderMutation = useMutation({
    mutationFn: () => groupService.assignLeader(groupID, member.userID),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['group-members', groupID] })
      toaster.success({ text: 'Assign leader successfully' })
      onOpenChange()
      onSuccess()
    },
    onError: () => {
      toaster.error({ text: 'Cannot assign leader' })
    }
  })

  return (
    <>
      {isCurrentUserLeader && member.position !== 'Leader' && (
        <EditIcon onClick={onOpen} className='w-5 h-5 stroke-1 cursor-pointer' />
      )}
      <Modal size='xl' isOpen={isOpen} onOpenChange={onOpenChange} placement='top-center'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Edit Member</ModalHeader>
              <ModalBody>
                <div className='flex flex-col text-center'>
                  <div className='mb-3'>
                    <Avatar
                      src={member.avatarUrl || 'https://i.pravatar.cc/150?img=default'}
                      className='w-20 h-20 mx-auto'
                    />
                    <p className='text-lg font-semibold text-center'>{member.name}</p>
                  </div>
                  <p className='text-sm'>{member.position}</p>
                  <p className='text-nowrap'>Student ID {member.userID}</p>
                  <p className='text-nowrap'>{member.email}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                {isCurrentUserLeader && member.position !== 'Leader' && (
                  <>
                    <Button color='danger' variant='light' onPress={() => removeMemberMutation.mutate()}>
                      Remove Member
                    </Button>
                    <Button color='danger' variant='light' onPress={() => assignLeaderMutation.mutate()}>
                      Assign Leader
                    </Button>
                  </>
                )}
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
