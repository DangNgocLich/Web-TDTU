import React, { memo, useCallback, useEffect, useState } from 'react'
import { FaceRounded, AddComment, ArrowRightSharp as CommentIcon } from '@material-ui/icons'
import { getPostByIDAPI } from '../../api/postAPI'
function PostItem(props) {

  const { _id, user, createdAt, socket, content } = props

  const [comment, setComment] = useState('')
  const [limitComment, setLimitComment] = useState(3)
  const [comments, setComments] = useState(props.comment)
  const createDate = useCallback(() => new Date(createdAt), [createdAt])

  useEffect(() => {
    getPostByIDAPI({id: _id, limitComment}).then(result => {
      if(result.resultCode == 1) return setComments(result.data.comment)
    })
  },[limitComment])
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
      <div className="flex border-b-2">
        {content}
      </div>
      <div className='ml-4' >
        {comments?.map(cm => {
          return (
            <div className="flex">
              <FaceRounded
                fontSize='large'
              />
              <div>
                <p className = 'font-bold' >{cm.by.displayName}</p>
                <p>{cm.content}</p>
              </div>
            </div>
          )
        })}
        <button
          onClick = {() => {
            setLimitComment(limitComment+3)
          }}
        >
          Xem thêm
        </button>
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
    </div>
  )
}

export default memo(PostItem)