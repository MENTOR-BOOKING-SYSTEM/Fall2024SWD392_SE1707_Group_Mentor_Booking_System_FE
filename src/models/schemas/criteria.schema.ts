import { z } from 'zod'

export const criteriaSchema = z.object({
  name: z.string(),
  description: z.string(),
  type: z.string()
})

export const assignCriteriasSchema = z.object({
  semesterID: z.string(),
  criteria: z.array(z.string()).default([])
})
