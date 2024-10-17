import projectService from '@/services/project.services'
import { useAuth } from '@/hooks/use-auth'
import { submitProjectSchema, submitProjectWithMentorIDSchema } from '@/models/schemas/project.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useLocalStorage } from 'usehooks-ts'
import { z } from 'zod'

export type SubmitProjectFormValues = z.infer<typeof submitProjectSchema>
export type SubmitProjectWithMentorIDFormValues = z.infer<typeof submitProjectWithMentorIDSchema>

export const useSubmitProject = () => {
  const { user } = useAuth()
  const actorsLS = `${user?.user_id}-act`
  const funcRequirementsLS = `${user?.user_id}-fr`

  const [funcRequirements] = useLocalStorage(`${user?.user_id}-fr`, { [funcRequirementsLS]: '' })
  const [actors] = useLocalStorage(`${user?.user_id}-act`, { [actorsLS]: '' })

  const methods = useForm<SubmitProjectFormValues>({
    resolver: zodResolver(submitProjectSchema),
    defaultValues: {
      projectName: '',
      funcRequirements: funcRequirements[funcRequirementsLS],
      actors: actors[actorsLS]
    }
  })

  const methodsWithMentorID = useForm<SubmitProjectWithMentorIDFormValues>({
    resolver: zodResolver(submitProjectWithMentorIDSchema),
    defaultValues: {
      projectName: '',
      funcRequirements: funcRequirements[funcRequirementsLS],
      actors: actors[actorsLS]
    }
  })

  const submitProjectMutation = useMutation({
    mutationFn: projectService.submit
  })

  if (user?.role.includes('Mentor')) {
    return { methods, submitProjectMutation }
  } else {
    return { methods: methodsWithMentorID, submitProjectMutation }
  }
}
