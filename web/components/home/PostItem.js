import React, { memo, useCallback, useEffect, useState } from 'react'
import { FaceRounded, AddComment, ArrowRightSharp as CommentIcon } from '@material-ui/icons'
function PostItem(props) {

  const { _id, user, createdAt, socket, comment: comments, content } = props

  const [comment, setComment] = useState('')

  const createDate = useCallback(() => new Date(createdAt), [createdAt])

  useEffect(() => {
    console.log("Update", _id)
  })
  return (
    <div className='bg-white p-2 rounded-sm mt-2 text-left'>
      <div className='flex pb-2 items-center'>
        <FaceRounded
          fontSize='large'
        />
        <div className='text-left'>
          <p>{user?.displayName}</p>
          <p className='text-sm text-gray-500'>{createDate().toDateString()}</p>
        </div>
      </div>
      <div>
        {content}
      </div>
      <form className='flex'
        onSubmit={(e) => {
          e.preventDefault()
          socket.emit("onComment", {
            postID: _id,
            uid: "609ff716b467e3161111427f",
            content: comment
          })
          setComment('')
        }}
      >
        <input
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          type='text' border-b-2
          className='w-full bg-gray-200 rounded-xl p-2 focus:outline-none'
          placeholder="Post something"
        />
        <button
          className='text-gray-700 p-2 focus:outline-none hover:bg-gray-200 rounded-xl'
          type='submit'
        >
          <CommentIcon
            htmlColor='blue'
            fontSize='large'
          />
        </button>
      </form>
      {comments?.map(cm => {
        return (
          <div className="flex">
            <FaceRounded
              fontSize='large'
            />
            <p>{cm.content}</p>
          </div>
        )
      })}
    </div>
  )
}

export default memo(PostItem)