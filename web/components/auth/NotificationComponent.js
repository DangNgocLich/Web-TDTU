import { Button, Modal, TextField, TextareaAutosize, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Pagination } from '@material-ui/lab';
import {
  addNotificationAPI, getNotificationAPI, getLengthNotification
} from '../../api/notificaitionAPI'
import {
  getDepartmentUserByID,
} from '../../api/authAPI'
import cookie from 'react-cookies'
import { accessTokenSecret } from '../../../server/middleware/AuthMiddleware'
import { verifyToken } from "../../../server/helpers/jwt.helper";
export default function HomeComponent({ router, cookies }) {
  const [title, settitle] = useState('')
  const [addnotification, setaddnotification] = useState(false)
  const [content, setcontent] = useState('')
  const [department, setdepartment] = useState([])
  const [selectdepartment, setselectdepartment] = useState()
  const [notification, setnotification] = useState()
  const [page, setPage] = useState(0)
  const [length, setlength] = useState(1)
  useEffect(() => {
    getDepartmentUserByID()
      .then(result => {
        if (result.resultCode === 1) {
          setdepartment(result.data.department)
        }
      })
    getLengthNotification()
      .then(result => {
        if (result.resultCode === 1) {
          setlength(result.data)
        }
      })
  }, [])

  useEffect(() => {
    getNotificationAPI({ limit: 10, page }).then(result => {
      console.log(result)
      if (result.resultCode === 1) {
        setnotification(result.data)
      }
    })
  }, [page])

  return (

    <div className='flex flex-col h-screen items-center '>
      <Pagination style={{
        marginTop: 20
      }} count={Math.ceil(length / 10)} showFirstButton showLastButton onChange={(event, value) => {
        console.log(value)
        setPage(parseInt(value) - 1);
      }} />
      <div style={{
        borderLeft: 1,
        borderLeftStyle: "solid",

        // marginRight: 20,
        background: "red",
        maxWidth: "90%"
      }} className='flex flex-col w-full  bg-white  p-12'>
        <InputLabel style={{
          fontSize: 32,
          color: "red"
        }} id="demo-simple-select-helper-label">Title</InputLabel>
        <div style={{
          alignItems: "stretch",
          overflow: "hidden",
          width:"10%"
        }}>
          <InputLabel
            maxLength="12"
            style={{
              // fontSize: 20,
              marginLeft: 20,
              width: "100%",
            }}>
            noi dungnoi dungnoi dungnoi dungnoi dungnoi dungnoi dungnoi dungnoi dungnoi dungnoi dungnoi dungnoi dungnoi dungnoi dungnoi dungnoi dungnoi dungnoi dungnoi dungnoi dung
            </InputLabel>
        </div>

        <InputLabel
          margin="dense"
          style={{
            // fontSize: 20,
            margin: 20,
            textAlign: "right"
          }}
          id="demo-simple-select-helper-label">noi dung</InputLabel>
      </div>
      {/* <button type="button" onClick={() => setaddnotification(true)}>
        Open Modal</button>
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
            setaddnotification(false)
            addNotificationAPI({ title, content, department: selectdepartment })
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
                marginBottom: 20,
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
            <FormControl style={{
              marginBottom: 20,
              width: "100%"
            }}>
              <InputLabel id="demo-simple-select-helper-label">Phòng Ban</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={selectdepartment}
                onChange={(event) => {
                  setselectdepartment(event.target.value)
                }}
              >

                {department.map((item) =>
                  <MenuItem value={item._id}>
                    {item.label}
                  </MenuItem>
                )}
              </Select>

            </FormControl>
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
      </Modal> */}
    </div >
  )

}