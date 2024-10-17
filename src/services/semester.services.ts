import httpInstance from '@/lib/axios/axios'
import { GetAllSemestersResponse, GetCurrentPhaseAPIResponse } from '@/models/api/res.model'

class SemesterService {
  async getAllSemesters() {
    const { data } = await httpInstance.get<GetAllSemestersResponse>('/semesters/all')
    return data.result
  }

  async getCurrentPhase() {
    const { data } = await httpInstance.get<GetCurrentPhaseAPIResponse>('/semesters/current-phase')

    return data.result
  }
}

const semesterService = new SemesterService()
export default semesterService
