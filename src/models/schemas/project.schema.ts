import { z } from 'zod'

export const submitProjectSchema = z.object({
  projectName: z.string().refine((val) => val.length !== 0, {
    message: 'Project name is required'
  }),
  context: z.string().optional().default(''),
  problems: z.string().optional().default(''),
  actors: z.string().refine((val) => val.length !== 0, { message: 'Actor is required' }),
  funcRequirements: z.string().refine((val) => val.length !== 0, { message: 'Functional requirement is required' }),
  nonFuncRequirements: z.string().optional().default(''),
  technologies: z.array(z.number()).default([]),
  collaborators: z.array(z.number()).default([]),
  mentorID: z.string().optional().default('6')
})

export const submitProjectWithMentorIDSchema = z.object({
  projectName: z.string().refine((val) => val.length !== 0, {
    message: 'Project name is required'
  }),
  context: z.string().optional().default(''),
  problems: z.string().optional().default(''),
  actors: z.string().refine((val) => val.length !== 0, { message: 'Actor is required' }),
  funcRequirements: z.string().refine((val) => val.length !== 0, { message: 'Functional requirement is required' }),
  nonFuncRequirements: z.string().optional().default(''),
  technologies: z.array(z.number()).default([]),
  collaborators: z.array(z.number()).default([]),
  mentorID: z.string({ required_error: 'Mentor is required' }).default('6')
})
