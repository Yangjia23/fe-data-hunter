import axios from './index'
import {RegisterPayload, LoginPayload} from '../typings/user'

export function validate() {
  return axios.get("/user/validate");
}

export function register<T>(data: RegisterPayload) {
  return axios.post<T, T>('/user/register', data)
}

export function login<T>(data: LoginPayload) {
  return axios.post<T, T>('/user/login', data)
}