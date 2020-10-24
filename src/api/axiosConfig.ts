import axios from 'axios'
import { BASE_URL_API, TIMEOUT } from '../constants/config'
import extendAxiosError from '../utils/errorHandler'

const axiosInstance = axios.create({
  baseURL: BASE_URL_API,
  timeout: TIMEOUT
})

axiosInstance.interceptors.request.use(
  (config: any) => config,
  (error: any) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
  (response: any) => response,
  (error: any) => Promise.reject(extendAxiosError(error))
)

export default axiosInstance
