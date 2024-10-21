import { z } from 'zod'

export const createGroupSchema = z.object({
  groupName: z.string().min(1, 'Group name is required'),
  usersID: z.array(z.number()).nonempty('At least one user must be selected')
})
