import { reviewProjectSchema } from '@/models/schemas/project.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export type ReviewProjectFormValues = z.infer<typeof reviewProjectSchema>

export const useReviewProject = (projectID: string | undefined) => {
  const methods = useForm<ReviewProjectFormValues>({
    resolver: zodResolver(reviewProjectSchema),
    defaultValues: {
      projectID: projectID || '',
      criteriaID: [],
      type: 'Accept'
    }
  })

  return { methods }
}
