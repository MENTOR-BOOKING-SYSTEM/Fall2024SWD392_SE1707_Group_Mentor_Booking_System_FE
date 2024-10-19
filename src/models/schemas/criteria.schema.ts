import { z } from 'zod'

export const criteriaSchema = z.object({
  name: z.string(),
  description: z.string(),
  type: z.string()
})
