import React, { useCallback, useEffect, useState } from 'react'
import { getPostsAPI, getPostByIDAPI } from '../../api/postAPI'
import NewPost from './NewPost'
import PostItem from './PostItem'
export default function HomeComponent({ router, socket }) {

  const [postData, setPostData] = useState([])

  const [notiData, setNotiData] = useState([])

  const getPosts = useCallback(() => getPostsAPI({ limit: 1000 }).then(result => {
    if (result.resultCode === 1) return setPostData(result.data?.map(post => ({ ...post, reload: false })))
    alert(123213, result.message)
  }), [setPostData])

  useEffect(() => {
    getPosts()
  }, [])

  useEffect(() => {
    socket?.off('commentSuccess');
    socket?.on("commentSuccess", data => {
      const { postID } = data;
      getPostByIDAPI({ id: postID, limitComment: 3 }).then(result => {
        const index = postData.findIndex(post => (post._id == postID))
        if (index != -1) postData[index].reload = !postData[index].reload
        setPostData([...postData])
      })
      // 
    })
  }, [postData])


  useEffect(() => {
    socket?.off('postSuccess');
    socket?.on("postSuccess", data => {
      console.log(data)
    })
  }, [])


  return (
    <div className='flex flex-col w-full overflow-y-scroll items-center bg-gray-200'>
      <div className = 'flex w-96 md:w-1/2 flex-col p-2' >
        <NewPost />
        {postData.map(post => {
          return (
            <PostItem key={post._id} {...post} reload={post.reload} socket={socket} />
          )
        })}
      </div>

    </div>
  )

}