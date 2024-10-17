import httpInstance from '@/lib/axios/axios'
import type { CreateSemesterFormValues } from '@/features/semester/create-semester/use-create-semester'
import type {
  CreateSemesterAPIResponse,
  GetAllSemestersResponse,
  GetCurrentPhaseAPIResponse
} from '@/models/api/res.model'

class SemesterService {
  async getAllSemesters() {
    const { data } = await httpInstance.get<GetAllSemestersResponse>('/semesters/all')
    return data.result
  }

  async getCurrentPhase() {
    const { data } = await httpInstance.get<GetCurrentPhaseAPIResponse>('/semesters/current-phase')
    return data.result
  }

  async createSemester(semester: CreateSemesterFormValues) {
    const { data } = await httpInstance.post<CreateSemesterAPIResponse>('/semesters/create', semester)
    return data.message
  }
}

const semesterService = new SemesterService()
export default semesterService
