import projectService from '@/services/project.services'
import { submitProjectSchema, submitProjectWithMentorIDSchema } from '@/models/schemas/project.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useLocalStorage } from 'usehooks-ts'
import { z } from 'zod'
import { toaster } from '@/components/ui/toaster'
import { useNavigate } from 'react-router-dom'
import { PRIVATE_ROUTES } from '@/routes/routes'
import { ROLES } from '@/constants'
import { useUser } from '@/hooks/use-user'

export type SubmitProjectFormValues = z.infer<typeof submitProjectSchema>
export type SubmitProjectWithMentorIDFormValues = z.infer<typeof submitProjectWithMentorIDSchema>

export const useSubmitProject = () => {
  const { user, currentUserInfo } = useUser()
  const navigate = useNavigate()
  const actorsLS = `${user?.user_id}-act`
  const funcRequirementsLS = `${user?.user_id}-fr`

  const [funcRequirements] = useLocalStorage(`${user?.user_id}-fr`, { [funcRequirementsLS]: '' })
  const [actors] = useLocalStorage(`${user?.user_id}-act`, { [actorsLS]: '' })

  const ownerId = user?.role.includes(ROLES.STUDENT) ? (currentUserInfo.groupID ?? 0) : user!.user_id

  const methods = useForm<SubmitProjectFormValues>({
    resolver: zodResolver(submitProjectSchema),
    defaultValues: {
      funcRequirements: funcRequirements[funcRequirementsLS],
      actors: actors[actorsLS],
      collaborators: [ownerId],
      type: user?.role.includes(ROLES.STUDENT) ? 'Group' : 'Personal'
    }
  })

  const methodsWithMentorID = useForm<SubmitProjectWithMentorIDFormValues>({
    resolver: zodResolver(submitProjectWithMentorIDSchema),
    defaultValues: {
      funcRequirements: funcRequirements[funcRequirementsLS],
      actors: actors[actorsLS],
      collaborators: [ownerId],
      type: user?.role.includes(ROLES.STUDENT) ? 'Group' : 'Personal'
    }
  })

  const submitProjectMutation = useMutation({
    mutationFn: projectService.submit,
    onSuccess: () => {
      toaster.success({ text: 'Submit project successfully' })
      methods.reset()
      navigate(PRIVATE_ROUTES.SUBMISSION.path)
    },
    onError: () => {
      toaster.error({ text: 'Submit project failed' })
    }
  })

  if (user?.role.includes('Mentor')) {
    return { methods, submitProjectMutation }
  } else {
    return { methods: methodsWithMentorID, submitProjectMutation }
  }
}
