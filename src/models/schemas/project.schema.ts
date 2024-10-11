import { z } from 'zod'

export const submitProjectSchema = z.object({
  projectName: z.string().refine((val) => val.length !== 0, {
    message: 'Project name is required'
  }),
  context: z.string().nullable().default(null),
  problems: z.string().nullable().default(null),
  actors: z.string().refine((val) => val.length !== 0, { message: 'Actor is required' }),
  funcRequirements: z.string().refine((val) => val.length !== 0, { message: 'Functional requirement is required' }),
  nonFuncRequirements: z.string().nullable().default(null),
  technologies: z.array(z.string()).default([]),
  collaborators: z.array(z.string()).default([]),
  mentorID: z.string().nullable().default(null)
})
