import httpInstance from '@/lib/axios/axios'
import axiosInstance from '@/lib/axios/axios'
import { CreateSemestersResponse, GetAllSemestersResponse, GetCurrentPhaseAPIResponse } from '@/models/api/res.model'

class SemesterService {
  async getAllSemesters() {
    const { data } = await axiosInstance.get<GetAllSemestersResponse>('/semesters/all')
    console.log(data)
    return data.result
  }

  async createSemester(semesterData: {
    semesterName: string
    startDate: string
    endDate: string
    description: string | null
  }) {
    const { data } = await axiosInstance.post<CreateSemestersResponse>('/semesters/create', {
      semesterName: semesterData.semesterName,
      desc: semesterData.description,
      startDate: semesterData.startDate,
      endDate: semesterData.endDate
    })
    console.log(data)
    return data.message
  }

  async getCurrentPhase() {
    const { data } = await httpInstance.get<GetCurrentPhaseAPIResponse>('/semesters/current-phase')
    return data.result
  }
}

const semesterService = new SemesterService()
export default semesterService
