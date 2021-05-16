import React, { useCallback, useEffect, useState } from 'react'
import { FaceRounded, AddComment } from '@material-ui/icons'
export default function NewPost({ router }) {

  const [content, setContent] = useState('')

  useEffect(() => {
  })
  return (
    <div className='bg-white text-center p-2 rounded-sm'>
      <div className='flex pb-2 items-center border-b-2'>
        <FaceRounded
          fontSize = 'large'
        />
        <input
          value = {content}
          onChange = {(e) => setContent(e.target.value)}
          type='text'border-b-2
          className = 'w-full bg-gray-200 rounded-xl p-2 focus:outline-none'
          placeholder = "Post something"
        />
      </div>
      <button
        className = 'text-gray-700 p-2 focus:outline-none hover:bg-gray-200 rounded-xl'
      >
        <AddComment 
          htmlColor = 'green'
          fontSize = 'large'
        /> Add new post
      </button>
    </div>
  )

}