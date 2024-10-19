import httpInstance from '@/lib/axios/axios'
import type {
  CreateSemesterAPIResponse,
  GetAllSemestersResponse,
  GetCurrentPhaseAPIResponse,
  GetSemesterCriteriasAPIResponse,
  GetSemesterDetailAPIResponse,
  GetSemesterTimestampsAPIResponse
} from '@/models/api/res.model'
import type { SemesterFormValues } from '@/features/semesters/create-semester/use-create-semester'

class SemesterService {
  async getAllSemesters() {
    const { data } = await httpInstance.get<GetAllSemestersResponse>('/semesters/all')
    return data.result
  }

  async getCurrentPhase() {
    const { data } = await httpInstance.get<GetCurrentPhaseAPIResponse>('/semesters/current-phase')
    return data.result
  }

  async createSemester(semester: SemesterFormValues) {
    const { data } = await httpInstance.post<CreateSemesterAPIResponse>('/semesters/create', semester)
    return data.message
  }

  async editSemester({ semesterID, semester }: { semesterID: number; semester: SemesterFormValues }) {
    const { data } = await httpInstance.patch<CreateSemesterAPIResponse>(`/semesters/${semesterID}`, semester)
    return data.message
  }

  async getSemesterById(semesterID: number | undefined) {
    if (!semesterID) return null
    const { data } = await httpInstance.get<GetSemesterDetailAPIResponse>(`/semesters/${semesterID}`)
    return data.result
  }

  async getSemesterTimestamps(semesterID: number | undefined) {
    if (!semesterID) return null
    const { data } = await httpInstance.get<GetSemesterTimestampsAPIResponse>(`/semesters/${semesterID}/timestamp`)
    return data.result
  }

  async getSemesterCriterias(semesterID: number | undefined) {
    if (!semesterID) return null
    const { data } = await httpInstance.get<GetSemesterCriteriasAPIResponse>(`/semesters/${semesterID}/criteria`)
    return data.result
  }
}

const semesterService = new SemesterService()
export default semesterService
