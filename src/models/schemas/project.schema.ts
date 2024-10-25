import { z } from 'zod'

export const submitProjectForMentorSchema = z
  .object({
    projectName: z.string().refine((val) => val.length !== 0, {
      message: 'Project name is required'
    }),
    context: z.string().optional().default(''),
    problems: z.string().optional().default(''),
    actors: z.string().refine((val) => val.length !== 0, { message: 'Actor is required' }),
    funcRequirements: z.string().refine((val) => val.length !== 0, { message: 'Functional requirement is required' }),
    nonFuncRequirements: z.string().optional().default(''),
    technologies: z.array(z.number()).default([]),
    collaborators: z.array(z.number()).max(2, { message: 'You can only collab with one user' }).default([]),
    mentorID: z.array(z.number()).default([]),
    type: z.enum(['Personal', 'Group', 'Collaboration'])
  })
  .transform((data) => {
    if (data.collaborators.length === 2) {
      return { ...data, type: 'Collaboration' }
    }
    return data
  })

export const submitProjectForOthersSchema = z.object({
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
  mentorID: z
    .array(z.number())
    .min(1, { message: 'User must choose at least one mentor for guidance' })
    .max(2, { message: 'Can only choose max two mentors' }),
  type: z.enum(['Personal', 'Group', 'Collaboration'])
})

export const reviewProjectSchema = z.object({
  projectID: z.string(),
  criteriaID: z.array(z.string()).default([]),
  type: z.enum(['Reject', 'Accept', 'Consider'])
})
