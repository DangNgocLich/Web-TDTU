import { fetchAPI } from './constant'
export const getDepartmentAPI = (input) => {
  return fetchAPI({
    url: "public/getDepartment",
    method: "GET",
    body: input
  })
    .then(result => result)
    .catch(err => ({ resultCode: -1, message: "Không thế kết nối" }))
}
