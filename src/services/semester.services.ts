import httpInstance from '@/lib/axios/axios'
import type { SemesterFormValues } from '@/features/semesters/create-semester/use-create-semester'
import {
  CreateSemesterAPIResponse,
  GetAllSemestersResponse,
  GetCurrentPhaseAPIResponse,
  GetSemesterCriteriasAPIResponse,
  GetSemesterDetailAPIResponse,
  GetSemesterTimestampsAPIResponse
} from '@/models/api/semesters/res.model'
import { GeneralAPIResponse } from '@/models/base.model'

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

  async assignCriterias({ semesterID, criteria }: { semesterID: string; criteria: string[] }) {
    const { data } = await httpInstance.post<GeneralAPIResponse>('/semesters/assign-criteria', { semesterID, criteria })
    return data.message
  }

  async getCurrentSemester() {
    const { data } = await httpInstance.get<GetSemesterDetailAPIResponse>('/semesters/current')
    return data.result
  }
}

const semesterService = new SemesterService()
export default semesterService
