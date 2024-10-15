import axiosInstance from '@/lib/axios/axios'
import { GetAllSemestersResponse } from '@/models/api/res.model'

class SemesterService {
  async getAllSemesters() {
    const { data } = await axiosInstance.get<GetAllSemestersResponse>('semester')
    return data.result
  }
}

const semesterService = new SemesterService()
export default semesterService
