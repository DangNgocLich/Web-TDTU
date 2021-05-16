import { Button, Modal, TextField, TextareaAutosize } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import {
  addNotificationAPI,
  deleteNotificationAPI,
  getNotificationAPI,
  getNotificationByDepartment,
  updateNotificationAPI
} from '../../api/notificaitionAPI'

export default function HomeComponent({ router }) {
  const [title, settitle] = useState('')
  const [addnotification, setaddnotification] = useState(false)
  const [content, setcontent] = useState('')
 
  return (

    <div className='flex flex-col w-screen h-screen justify-center items-center bg-gradient-to-r from-green-400 to-blue-500'>

      <button type="button" onClick={() => setaddnotification(true)}>
        Open Modal
</button>
      <Modal
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

        }}
        open={addnotification}
        onClose={() => setaddnotification(false)}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log({ title, content })
            addNotificationAPI({ title, content })
              .then(result => {
                alert(result.message)
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
                minHeight: 100,
                padding: 16,
                border: 1,

              }}
              value={content}
              onChange={(e) => setcontent(e.target.value)}
              rowsMax={4}
              aria-label="maximum height"
              className='w-full'
              variant='outlined'
              label="content"
              placeholder="Enter content"
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