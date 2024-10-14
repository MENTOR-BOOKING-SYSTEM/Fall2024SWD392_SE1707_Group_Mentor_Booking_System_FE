import axiosInstance from '@/lib/axios/axios'
import { GetAllSemesterResponse, GetAllTechsAPIResponse } from '@/models/api/res.model'

class SemesterService {
  async getAllSemester() {
    const { data } = await axiosInstance.get<GetAllSemesterResponse>('semester')
    return data.result
  }
}

const semesterService = new SemesterService()
export default semesterService
