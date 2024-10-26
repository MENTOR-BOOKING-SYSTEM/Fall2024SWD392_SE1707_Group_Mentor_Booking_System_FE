import { toaster } from '@/components/ui/toaster'
import { queryClient } from '@/lib/react-query/query.provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createGroupSchema } from '@/models/schemas/group.schema'
import groupService from '@/services/group.services'
import { useAuth } from '@/hooks/use-auth'
import { useUser } from '@/hooks/use-user'

export type GroupFormValues = z.infer<typeof createGroupSchema>

export function useCreateGroup(onClose: () => void) {
  const { user } = useAuth()
  const { currentUserInfo } = useUser()

  const methods = useForm<GroupFormValues>({
    resolver: zodResolver(createGroupSchema)
  })

  const createGroupMutation = useMutation({
    mutationFn: ({ groupName, usersID }: GroupFormValues) => {
      if (currentUserInfo.groupID !== null) {
        throw new Error('You already have a group')
      }
      const leaderID = user?.user_id
      if (!leaderID) {
        throw new Error('Cannot determine the group creator')
      }
      return groupService.createGroup(groupName, [leaderID, ...usersID])
    },
    onSuccess: (response) => {
      console.log('Create group success:', response)
      queryClient.invalidateQueries({ queryKey: ['groups'] })
      toaster.success({ text: 'Group created successfully' })
      onClose()
      methods.reset()
    },
    onError: (error) => {
      console.error('Error when creating group:', error)
      toaster.error({ text: error instanceof Error ? error.message : 'Have something wrong' })
    }
  })

  return { methods, createGroupMutation, currentUserInfo }
}
