import { Box, Button, Modal, TextField, TextareaAutosize } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { regisAPI } from '../../api/authAPI'
import { verifyToken } from '../../../server/helpers/jwt.helper'
import { accessTokenSecret } from '../../../server/middleware/AuthMiddleware'
import { getUsersAPI, getUsersByIdAPI } from '../../api/authAPI'
export default function HomeComponent({ router }) {
  const [title, settitle] = useState('')
  const [addnotification, setaddnotification] = useState(false)
  const [content, setcontent] = useState('')
  useEffect(() => {

  })
  const handleOpen = () => {
    setaddnotification(true)
  }
  const handleClose = () => {
    setaddnotification(false)
  }
  return (

    <div className='flex flex-col w-screen h-screen justify-center items-center bg-gradient-to-r from-green-400 to-blue-500'>

      <button type="button" onClick={handleOpen}>
        Open Modal
</button>
      <Modal
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

        }}
        open={addnotification}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginAPI({ title: title, content })
              .then(result => {
                if (result.resultCode === 1) {
                  cookie.save('accessToken', result.accessToken)

                  return router.push('/')
                }
              })
          }}
          style={{
            marginLeft: 20,
            marginRight: 20
          }}
          className='flex flex-col w-full md:w-100 bg-white rounded-xl p-12'>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

          }}
            className='flex flex-col w-full md:w-100 bg-white rounded-xl p-12'>

            <TextField
              value={title}
              onScroll
              onChange={(e) => settitle(e.target.value)}
              style={{ marginBottom: 20 }}
              className='w-full'
              variant='outlined'
              label="title"
              placeholder="Enter title"
            />
            <TextareaAutosize
              style={{
                width: "100%",
                height:100
              }}
              rowsMax={4}
              aria-label="maximum height"
            />
            <TextField
              value={content}
              multiline
              onChange={(e) => setcontent(e.target.value)}
              style={{ marginBottom: 20 }}
              className='w-full'
              variant='outlined'
              label="content"
              placeholder="Enter content"
              type='content'
            />
          </div>

          <Button
            style={{ marginBottom: 20 }}
            variant='contained'
            color='primary'
            type='submit'
          >
            Đăng Nội Dung
        </Button>
        </form>
      </Modal>
    </div>
  )

}