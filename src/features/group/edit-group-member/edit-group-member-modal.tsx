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
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            {isCurrentUserLeader && member.position !== 'Leader' ? 'Edit Member:' : 'View Member Detail:'} {member.name}
          </ModalHeader>
          <ModalBody>
            <div className='flex items-center gap-4'>
              <Avatar src={member.avatarUrl || undefined} alt={member.name} className='w-16 h-16' />
              <div>
                <p className='font-semibold'>{member.name}</p>
                <p className='text-sm text-gray-500'>{member.email}</p>
                <p className='text-sm'>Position: {member.position}</p>
                <p className='text-sm'>User ID: {member.userID}</p>
              </div>
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
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
