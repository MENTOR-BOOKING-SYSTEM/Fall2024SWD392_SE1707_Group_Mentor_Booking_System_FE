import projectService from '@/services/project.services'
import { toaster } from '@/components/ui/toaster'
import { useUser } from '@/hooks/use-user'
import { submitProjectForMentorSchema } from '@/models/schemas/project.schema'
import { PRIVATE_ROUTES } from '@/routes/routes'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLocalStorage } from 'usehooks-ts'
import { z } from 'zod'

export type SubmitProjectForMentorFormValues = z.infer<typeof submitProjectForMentorSchema>

export const useSubmitProject = () => {
  const { user } = useUser()
  const navigate = useNavigate()
  const actorsLS = `${user?.user_id}-act`
  const funcRequirementsLS = `${user?.user_id}-fr`

  const [funcRequirements] = useLocalStorage(`${user?.user_id}-fr`, { [funcRequirementsLS]: '' })
  const [actors] = useLocalStorage(`${user?.user_id}-act`, { [actorsLS]: '' })

  const methods = useForm<SubmitProjectForMentorFormValues>({
    resolver: zodResolver(submitProjectForMentorSchema),
    values: {
      projectName: '',
      context: '',
      problems: '',
      actors: actors[actorsLS],
      funcRequirements: funcRequirements[funcRequirementsLS],
      nonFuncRequirements: '',
      technologies: [],
      mentorID: [],
      collaborators: user?.user_id ? [user?.user_id] : [],
      type: 'Personal'
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
