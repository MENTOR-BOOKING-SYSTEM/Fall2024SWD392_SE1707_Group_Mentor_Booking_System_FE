import { toaster } from '@/components/ui/toaster'
import { queryClient } from '@/lib/react-query/query.provider'
import { accountSchema } from '@/models/schemas/account.schema'
import { Account } from '@/models/user.model'
import dashboardService from '@/services/dashboard.services'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type EditAccountDetailFormValues = z.infer<typeof accountSchema>

export const useEditAccountDetail = (
  account: Account | undefined,
  page: number,
  semesterID: number | undefined,
  onClose: () => void
) => {
  const [avatar, setAvatar] = useState('')

  const methods = useForm<EditAccountDetailFormValues>({
    resolver: zodResolver(accountSchema),
    values: {
      firstName: account?.firstName || '',
      lastName: account?.lastName || '',
      email: account?.email || '',
      username: account?.username || '',
      avatarUrl: account?.avatarUrl || '',
      roles: account?.roles.map((role) => role.roleID) || []
    }
  })

  const editAccountMutation = useMutation({
    mutationFn: dashboardService.editAccountDetail,
    onSuccess: (response) => {
      toaster.success({ text: response })
      queryClient.invalidateQueries({ queryKey: ['accounts', page, 10, semesterID] })
      onClose()
      methods.reset()
    },
    onError: () => {
      toaster.error({ text: 'Failed to edit account' })
    }
  })

  return { methods, editAccountMutation, avatar, setAvatar }
}
