import {fetchAPI} from './constant'
export const loginAPI = (input) => {
  return fetchAPI({
    url: "auth/login",
    method: "POST",
    body: input
  })
  .then(result => result)
  .catch(err => ({resultCode: -1, message: "Không thế kết nối"}) )
}

export const regisAPI = (input) => {
  return fetchAPI({
    url: "auth/register",
    method: "POST",
    body: input
  })
  .then(result => result)
  .catch(err => ({resultCode: -1, message: "Không thế kết nối"}) )
}