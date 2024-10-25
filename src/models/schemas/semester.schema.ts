import { z } from 'zod'

export const semesterSchema = z.object({
  semesterName: z.string(),
  description: z.string().optional().default(''),
  startDate: z.string(),
  endDate: z.string()
})
