import React, { useEffect, useState } from 'react'
import NewPost from './NewPost'
export default function HomeComponent({ router }) {

  const [postData, setPostData] = useState([])

  useEffect(() => {
  })
  return (
    <div className='flex flex-col w-full h-screen items-center bg-gray-200'>
      <div className = 'flex flex-col w-1/2 p-2' >
        <NewPost />
        {postData.map(post => {
          return(
            <div>asdasd</div>
          )
        })}
      </div>
      
    </div>
  )

}