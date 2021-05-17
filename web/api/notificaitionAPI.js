import { fetchAPI } from './constant'
export const getNotificationAPI = (input) => {
  return fetchAPI({
    url: `notification/getNotification?page=${input.page}&limit=${input.limit}`,
    method: "GET",
  })
    .then(result => result)
    .catch(err => ({ resultCode: -1, message: "Không thế kết nối" ,}))
}
export const addNotificationAPI = (input) => {
  return fetchAPI({
    url: "notification/addNotification",
    method: "POST",
    body: input
  })
    .then(result => result)
    .catch(err => ({ resultCode: -1, message: "Không thế kết nối" }))
}
export const updateNotificationAPI = (input) => {
  return fetchAPI({
    url: `notification/updateNotification/${input._id}`,
    method: "POST",
    body: input
  })
    .then(result => result)
    .catch(err => ({ resultCode: -1, message: "Không thế kết nối" }))
}
export const deleteNotificationAPI = (input) => {
  return fetchAPI({
    url: `notification/deleteNotification/${input._id}`,
    method: "POST",
    body: input
  })
    .then(result => result)
    .catch(err => ({ resultCode: -1, message: "Không thế kết nối" }))
}
export const getNotificationByDepartment = (input) => {
  return fetchAPI({
    url: `notification/getNotificationByDepartment/${input._id}`,
    method: "GET",
    body: input
  })
    .then(result => result)
    .catch(err => ({ resultCode: -1, message: "Không thế kết nối" }))
}
export const getLengthNotification = (input) => {
  return fetchAPI({
    url: `notification/getLengthNotification/`,
    method: "GET",
    body: input
  })
    .then(result => result)
    .catch(err => ({ resultCode: -1, message: "Không thế kết nối" }))
}