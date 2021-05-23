import { Button, Modal, TextField, TextareaAutosize, FormControl, InputLabel, Select, Menunotification, Menu, Typography, MenuList, MenuItem } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Pagination } from '@material-ui/lab';
import {
  addNotificationAPI, deleteNotificationAPI, getNotificationByIdAPI, updateNotificationAPI
} from '../../api/notificaitionAPI'
import {
  getDepartmentUserByID,
} from '../../api/authAPI'
import UserProfile from '../../userProfile/UserProfile';
import { FaceRounded, MoreHoriz } from '@material-ui/icons'
export default function NotificationDetail({ router, socket }) {
  const [title, settitle] = useState('')
  const [addnotification, setaddnotification] = useState(false)
  const [content, setcontent] = useState('')
  const [department, setdepartment] = useState([])
  const [selectdepartment, setselectdepartment] = useState()
  const [notification, setNotification] = useState()
  const [page, setPage] = useState(0)
  const [length, setlength] = useState(1)
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [edit, setEdit] = useState(false)
  const [_id, setId] = useState()


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = (id, title, content) => {
    settitle(title)
    setcontent(content)
    setId(id)
    setaddnotification(true)
    setEdit(true)
  };
  const handleDelete = (_id) => {
    if (confirm("Bạn có Chắc là xóa Chứ"))
      deleteNotificationAPI({ _id }).then(result => {
        if (result.resultCode === 1) {
          getNotificationByIdAPI({ limit: 10, page }).then(result => {
            if (result.resultCode === 1) {
              setNotification(result.data)
            }
          })
          handleClose()
          router.push({ pathname: "allnotification" })
        }
      })
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);
  useEffect(() => {
    let _id = router.query._id
    getNotificationByIdAPI({ _id }).then(result => {
      if (result.resultCode === 1) {
        setNotification(result.data)
      }
    })
  }, [])
  return (
    <div style={{
      flex: 1
    }} className='flex flex-col w-full overflow-y-scroll notifications-center bg-gray-200'>
      <div style={{
        borderLeft: 1,
        borderLeftStyle: "solid",
        justifyContent: "flex-start",
        marginLeft: 20,
        width: "95%",
        marginTop: 20,

      }} className='flex flex-col w-full  bg-white  p-6'>

        <div className='w-full'>
          <div
            style={{
              alignItems: "center"
            }}
            className='flex'
          >
            <p style={{
              textAlign: "center",
              fontSize: 32
            }} className='font-bold flex-1' >
              {notification?.title}
            </p>
            {/* */}
            {UserProfile.data.id == notification?.uid && <Button
              className='focus:outline-none'
              aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}
            >
              <MoreHoriz fontSize='small' />
            </Button>}
          </div>
        </div>
        <Menu
          style={{
            alignSelf: "flex-end",
            justifyContent: "flex-end"
          }}
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={() => {
            handleEdit(notification?._id, notification?.title, notification?.content,)
          }}>Edit</MenuItem>
          <MenuItem onClick={() => {
            handleDelete(notification?._id)
          }}>Delete</MenuItem>
        </Menu>
        <p className='font-medium flex-1'>
          {notification?.content}
        </p>
        <div className='text-right' style={{
        }}>
          <p style={{
            fontStyle: "italic",
            textAlign: 'right'
          }}
            className='text-gray-500'>
            {notification && notification?.department.label} | Ngày Đăng {notification && new Date(notification?.createdAt).toISOString().replace(/T.*/, '').split('-').reverse().join('-')}
          </p>
        </div>
      </div>
      <Modal
        style={{
          display: 'flex',
          alignnotifications: 'center',
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
            if (edit) {
              setEdit(false)
              console.log({ title, content, _id })
              updateNotificationAPI({ title, content, _id }).then(result => {
                if (result.resultCode === 1) {
                  alert(result.message)
                }
              })
              settitle("")
              setcontent("")
              getNotificationAPI({ limit: 10, page }).then(result => {
                if (result.resultCode === 1) {
                  setNotification(result.data)
                }
              })
            }
            else {
              addNotificationAPI({ title, content, department: selectdepartment })
                .then(result => {
                  alert(result.message)
                  if (result.resultCode == "1") {
                    socket.emit("onPost", {
                      postID: result.data,
                      uid: UserProfile.data.data.id,
                      title: title
                    })
                    settitle("")
                    setcontent("")
                    setselectdepartment({})
                    getNotificationAPI({ limit: 10, page }).then(result => {
                      if (result.resultCode === 1) {
                        setNotification(result.data)
                      }
                    })
                  }
                })
            }

          }}
          style={{
            marginLeft: 20,
            marginRight: 20
          }}
          className='flex flex-col w-full md:w-100 bg-white rounded-xl p-12'>

          <div style={{
            display: 'flex',
            alignnotifications: 'center',
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
              {!edit && <>
                <InputLabel id="demo-simple-select-helper-label">Phòng Ban</InputLabel>
                <Select
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={selectdepartment}
                  onChange={(event) => {
                    setselectdepartment(event.target.value)
                  }}
                >
                  {department.map((notification) =>
                    <Menunotification value={notification?._id}>
                      {notification?.label}
                    </Menunotification>
                  )}
                </Select></>}

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
      </Modal>
    </div>

  )

}