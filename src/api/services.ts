import { SHOWS_ALL_API, SEARCH_SHOWS_BY_NAME } from '@/constants/endpoints'
import { AxiosResponse } from 'axios'
import { TShow } from '@/store/shows'
import axiosInstance from './axiosConfig'


export const servicesAPI = {
  getShows: (): Promise<AxiosResponse<TShow[]>> => axiosInstance.get(SHOWS_ALL_API),
  searchByText: (q: string) => axiosInstance.get(`${SEARCH_SHOWS_BY_NAME}?q=${q}`),
  getShowById: (id: string) => axiosInstance.get(`${SHOWS_ALL_API}/${id}`)
}
