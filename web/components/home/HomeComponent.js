import React, { useCallback, useEffect, useState } from 'react'
import { getPostsAPI, getPostByIDAPI } from '../../api/postAPI'
import NewPost from './NewPost'
import PostItem from './PostItem'
export default function HomeComponent({ router, socket }) {

  const [postData, setPostData] = useState([])

  const [notiData, setNotiData] = useState([])

  const getPosts = useCallback(() => getPostsAPI({ limit: 1000 }).then(result => {
    if (result.resultCode === 1) return setPostData(result.data?.map(post => ({ ...post, reload: false })))
    alert(result.message)
  }), [setPostData])

  const reloadByPostID = useCallback((postID) => 
    getPostByIDAPI({ id: postID, limitComment: 3 }).then(result => {
      const index = postData.findIndex(post => (post._id == postID))
      if (index != -1) postData[index].reload = !postData[index].reload
      setPostData([...postData])
    })
  ,[postData])

  useEffect(() => {
    getPosts()
  }, [])

  useEffect(() => {
    socket?.off('commentSuccess');
    socket?.on("commentSuccess", data => {
      const { postID } = data;
      reloadByPostID(postID)
      // 
    })
    socket?.off('onCommentDelete');
    socket?.on("onCommentDelete", data => {
      const { postID } = data
      reloadByPostID(postID)
    })
  }, [postData])

  const onAddPost = (newPost) => {
    postData.unshift(newPost)
    setPostData([...postData])
  }


  useEffect(() => {
  }, [])


  return (
    <div className='flex flex-col w-full h-full overflow-y-scroll items-center bg-gray-200'>
      <div className='flex w-96 md:w-1/2 flex-col p-2' >
        <NewPost onAddPost={onAddPost} />
        {postData.map(post => {
          return (
            <PostItem key={post._id} {...post} reload={post.reload} socket={socket} />
          )
        })}
      </div>

    </div>
  )

}