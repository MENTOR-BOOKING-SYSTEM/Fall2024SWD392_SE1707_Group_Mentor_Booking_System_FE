import { z } from 'zod'

export const createCriteriaSchema = z.object({
  name: z.string(),
  description: z.string(),
  type: z.string()
})
