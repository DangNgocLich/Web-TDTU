import { fetchAPI } from './constant'

export const addPostAPI = (input) => {
  return fetchAPI({
    url: "post/getPost",
    method: "GET",
  })
    .then(result => result)
    .catch(err => ({ resultCode: -1, message: "Không thế kết nối" }))
}

export const getPostsAPI = (input) => {
  return fetchAPI({
    url: "post/getPost",
    method: "GET",
  })
    .then(result => result)
    .catch(err => ({ resultCode: -1, message: "Không thế kết nối" }))
}

export const getPostByIDAPI = (id) => {
  return fetchAPI({
    url: "post/getPostByID?id="+id,
    method: "GET",
  })
    .then(result => result)
    .catch(err => ({ resultCode: -1, message: "Không thế kết nối" }))
}
