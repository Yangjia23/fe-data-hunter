import axios from './index'

export function getProducts() {
  return axios.post("/matomo/getAllSite");
}

export function validate() {
  return axios.post("/user/validate");
}