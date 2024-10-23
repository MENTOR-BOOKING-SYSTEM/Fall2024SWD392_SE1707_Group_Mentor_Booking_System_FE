export interface Project {
  projectID: number
  projectName: string
  slug: string
  funcRequirements: string
  nonFuncRequirements: string
  context: string
  actors: string
  problems: string
  status: number
  createdAt: string
  updatedAt: string
  deletedAt: string | null
}
