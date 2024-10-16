import axiosInstance from '@/lib/axios/axios'
import { GetAllSemestersResponse } from '@/models/api/res.model'

class SemesterService {
  async getAllSemesters() {
    const { data } = await axiosInstance.get<GetAllSemestersResponse>('semesters/all')
    console.log(data)
    return data.result
  }
}

const semesterService = new SemesterService()
export default semesterService
