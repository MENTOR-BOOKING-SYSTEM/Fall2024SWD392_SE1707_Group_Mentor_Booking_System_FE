import { toaster } from '@/components/ui/toaster'
import { queryClient } from '@/lib/react-query/query.provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { createGroupSchema } from '@/models/schemas/group.schema'
import groupService from '@/services/group.services'

export type GroupFormValues = z.infer<typeof createGroupSchema>

export function useCreateGroup(onClose: () => void) {
  const methods = useForm<GroupFormValues>({
    resolver: zodResolver(createGroupSchema)
  })

  const createGroupMutation = useMutation({
    mutationFn: ({ groupName, usersID }: GroupFormValues) => {
      return groupService.createGroup(groupName, usersID)
    },
    onSuccess: (response) => {
      console.log('Create group success:', response)
      queryClient.invalidateQueries({ queryKey: ['groups'] })
      toaster.success({ text: 'Group Created Successfully' })
      onClose()
      methods.reset()
    },
    onError: (error) => {
      console.error('Create group error:', error)
      toaster.error({ text: 'Have something wrong' })
    }
  })

  return { methods, createGroupMutation }
}
