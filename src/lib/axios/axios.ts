import axios from 'axios'
import { envConfig } from '@/constants/env'

const axiosInstance = axios.create({
  baseURL: envConfig.BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

axiosInstance.interceptors.request.use()
axiosInstance.interceptors.response.use()

export default axiosInstance
