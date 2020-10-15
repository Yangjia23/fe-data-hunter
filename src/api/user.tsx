import axios from './index'
import { VistorData } from '../typings/user'

export function getVistorData<T>(data: VistorData) {
  return axios.post<T, T>('/api/dataHunter/matomo/getVistorData', data)
}