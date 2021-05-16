import React, { useEffect, useState } from 'react'
import { FaceRounded, AddComment } from '@material-ui/icons'
export default function NewPost({ router }) {

  useEffect(() => {
  })
  return (
    <div className='bg-white text-center py-2 rounded-sm'>
      <div className='flex pb-2 m-2 mx-4 items-center border-b-2'>
        <FaceRounded
          fontSize = 'large'
        />
        <input
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