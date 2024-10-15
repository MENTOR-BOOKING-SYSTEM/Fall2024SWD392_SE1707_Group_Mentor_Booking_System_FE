import axiosInstance from '@/lib/axios/axios'
import { GetCurrentPhaseAPIResponse } from '@/models/api/res.model'

class SemesterService {
  async getCurrentPhase() {
    const { data } = await axiosInstance.get<GetCurrentPhaseAPIResponse>('/semesters/current-phase')
    return data.result
  }
}

const semesterService = new SemesterService()
export default semesterService
