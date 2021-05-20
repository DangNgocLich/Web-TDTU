import React, { memo, useCallback, useEffect, useState } from 'react'
import { FaceRounded, AddComment, ArrowRightSharp as CommentIcon } from '@material-ui/icons'
import { getPostByIDAPI } from '../../api/postAPI'
function PostItem(props) {

  const { _id, user, createdAt, socket, content, reload } = props

  const [comment, setComment] = useState('')
  const [limitComment, setLimitComment] = useState(3)
  const [comments, setComments] = useState(props.comment)
  const createDate = useCallback(() => new Date(createdAt), [createdAt])

  const [isMoreComment, setMoreComment] = useState(false)

  useEffect(() => {
    getPostByIDAPI({ id: _id, limitComment }).then(result => {
      if (result.resultCode == 1) {
        setComments(result.data.comment)
        if (result.data.comment?.length >= limitComment) return setMoreComment(true)
        if (isMoreComment == true) setMoreComment(false)
      }
    })
  }, [limitComment, reload])
  return (
    <div className='bg-white p-2 rounded-sm mt-2 text-left'>
      <div className='flex pb-2 items-center'>
        <FaceRounded
          fontSize='large'
        />
        <div className='text-left'>
          <p className='font-medium'>{user?.displayName}</p>
          <p className='text-sm text-gray-500'>{createDate().toDateString()}</p>
        </div>
      </div>
      <div className="flex border-b-2 text-gray-800">
        {content}
      </div>
      <div className='ml-4 mb-2' >
        {comments?.map(cm => {
          return (
            <div className="flex p-1 my-2 bg-gray-200 rounded-xl">
              <FaceRounded
                fontSize='large'
              />
              <div className = 'w-full'>
                <div
                  className = 'flex'
                >
                  <p className='font-medium flex-1' >{cm.by.displayName}</p>
                  <button
                    className = 'font-bold text-gray-700'
                  >
                    ...
                  </button>
                </div>
                <p className='text-gray-700'>{cm.content}</p>
              </div>
            </div>
          )
        })}
        {isMoreComment && <button
          onClick={() => {
            setLimitComment(limitComment + 5)
          }}
          className='text-gray-500 focus:outline-none'
        >
          Xem thêm
        </button>}
      </div>
      <form className='flex'
        onSubmit={(e) => {
          e.preventDefault()
          socket.emit("onComment", {
            postID: _id,
            uid: user._id,
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
          type='submit'
        >
        </button>
      </form>
    </div>
  )
}

export default memo(PostItem)