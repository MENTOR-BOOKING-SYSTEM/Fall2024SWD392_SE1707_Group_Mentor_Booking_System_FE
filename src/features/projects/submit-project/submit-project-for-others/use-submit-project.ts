import projectService from '@/services/project.services'
import { toaster } from '@/components/ui/toaster'
import { ROLES } from '@/constants'
import { useGetStudentsByGroup } from '@/features/users/students/get-students-by-group/use-get-students-by-group'
import { useUser } from '@/hooks/use-user'
import { submitProjectForOthersSchema } from '@/models/schemas/project.schema'
import { PRIVATE_ROUTES } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'
import { z } from 'zod'

export type SubmitProjectForOthersFormValues = z.infer<typeof submitProjectForOthersSchema>

export const useSubmitProject = () => {
  const { user } = useUser()
  const { data } = useGetStudentsByGroup(user?.user_id)
  const navigate = useNavigate()
  const actorsLS = `${user?.user_id}-act`
  const funcRequirementsLS = `${user?.user_id}-fr`

  const [funcRequirements] = useLocalStorage(`${user?.user_id}-fr`, { [funcRequirementsLS]: '' })
  const [actors] = useLocalStorage(`${user?.user_id}-act`, { [actorsLS]: '' })

  const methods = useForm<SubmitProjectForOthersFormValues>({
    resolver: zodResolver(submitProjectForOthersSchema),
    values: {
      projectName: '',
      context: '',
      problems: '',
      actors: actors[actorsLS],
      funcRequirements: funcRequirements[funcRequirementsLS],
      nonFuncRequirements: '',
      technologies: [],
      mentorID: [],
      collaborators: data ? data.map((student) => student.userID) : user?.user_id ? [user?.user_id] : [],
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

  return { methods, submitProjectMutation }
}
