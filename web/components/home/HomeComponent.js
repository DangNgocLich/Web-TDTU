import React, { useCallback, useEffect, useState } from 'react'
import { getPostsAPI, getPostByIDAPI } from '../../api/postAPI'
import NewPost from './NewPost'
import PostItem from './PostItem'
export default function HomeComponent({ router, socket }) {

  const [postData, setPostData] = useState([])
  
  const getPosts = useCallback(() => getPostsAPI({limit: 1000}).then(result => {
    if(result.resultCode === 1) return setPostData(result.data?.map(post => ({...post, reload: false})))
    alert(result.message)
  }),[setPostData])

  useEffect(() => {
    getPosts()
  },[])

  useEffect(() => {
    socket?.off('commentSuccess');
    socket?.on("commentSuccess", data => {
      const {postID} = data;
      getPostByIDAPI({id: postID, limitComment: 3}).then(result => {
        const index = postData.findIndex(post => (post._id == postID))
        if(index != -1) postData[index].reload = !postData[index].reload
        setPostData([...postData])
      })
      // 
    })
  },[postData])

  return (
    <div className='flex flex-col w-full overflow-y-scroll items-center bg-gray-200'>
      <div className = 'flex flex-col w-1/2 p-2' >
        <NewPost />
        {postData.map(post => {
          return(
            <PostItem key = {post._id} {...post} reload = {post.reload} socket = {socket} />
          )
        })}
      </div>
      
    </div>
  )

}