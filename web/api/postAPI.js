import { fetchAPI } from './constant'

export const addPostAPI = (input) => {
  return fetchAPI({
    url: "post/addPost",
    method: "POST",
    body: input
  })
    .then(result => result)
    .catch(err => ({ resultCode: -1, message: "Không thế kết nối" }))
}

export const getPostsAPI = (input) => {
  const {limit} = input
  return fetchAPI({
    url: `post/getPost?limit=${limit}&limitComment=3`,
    method: "GET",
  })
    .then(result => {
      console.log(result)
      return result
    })
    .catch(err => ({ resultCode: -1, message: "Không thế kết nối" }))
}

export const getPostByIDAPI = ({id, limitComment}) => {
  return fetchAPI({
    url: `post/getPostByID?id=${id}&limitComment=${limitComment}`,
    method: "GET",
  })
    .then(result => result)
    .catch(err => ({ resultCode: -1, message: "Không thế kết nối" }))
}

export const deleteCommentAPI = (input) => {
  return fetchAPI({
    url: "post/deleteComment",
    method: "POST",
    body: input
  })
    .then(result => result)
    .catch(err => ({ resultCode: -1, message: "Không thế kết nối" }))
}
