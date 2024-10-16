import httpInstance from '@/lib/axios/axios'
import axiosInstance from '@/lib/axios/axios'
import { GetAllSemestersResponse, GetCurrentPhaseAPIResponse } from '@/models/api/res.model'

class SemesterService {
  async getAllSemesters() {
    const { data } = await axiosInstance.get<GetAllSemestersResponse>('semesters/all')
    console.log(data)
  }

  async getCurrentPhase() {
    const { data } = await httpInstance.get<GetCurrentPhaseAPIResponse>('/semesters/current-phase')

    return data.result
  }
}

const semesterService = new SemesterService()
export default semesterService
