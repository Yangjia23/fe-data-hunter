import axios from './index'
import {RegisterPayload, LoginPayload} from '../typings/user'

export function validate<T>() {
  return axios.get<T, T>("/user/validate");
}

export function login<T>(data: LoginPayload) {
  return axios.post<T, T>('/user/login', data)
}