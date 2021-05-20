import React, { memo, useCallback, useEffect, useState } from 'react'
import { FaceRounded, MoreHoriz } from '@material-ui/icons'
import { deleteCommentAPI, getPostByIDAPI } from '../../api/postAPI'
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import cookie from 'react-cookies'
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
        <p className = 'whitespace-pre-line' aria-multiline = {true}>{content}</p>
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
                  <CommentOption cmID = {cm._id} />
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
          if(!comment) return
          console.log(cookie.load('uid', true))
          socket.emit("onComment", {
            postID: _id,
            uid: cookie.load('uid', true),
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

const CommentOption = memo(({cmID}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    handleClose()
    alert("This fuction is on proccess")
  }
  
  const handleDelete = () => {
    handleClose()
    deleteCommentAPI({id: cmID}).then(result => {
      if(result.resultCode !== 1) alert(result.message)
    })
  }

  return (
    <div>
      <Button
        className = 'focus:outline-none'
        aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}
      >
        <MoreHoriz fontSize = 'small' />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </div>
  );
})

export default memo(PostItem)