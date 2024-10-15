import { z } from 'zod'

export const submitProjectSchema = z.object({
  projectName: z.string().refine((val) => val.length !== 0, {
    message: 'Project name is required'
  }),
  context: z.string().optional(),
  problems: z.string().optional(),
  actors: z.string().refine((val) => val.length !== 0, { message: 'Actor is required' }),
  funcRequirements: z.string().refine((val) => val.length !== 0, { message: 'Functional requirement is required' }),
  nonFuncRequirements: z.string().optional(),
  technologies: z.array(z.string()).default([]).optional()
})
