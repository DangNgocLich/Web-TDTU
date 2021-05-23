import { Button, Modal, TextField, TextareaAutosize, FormControl, InputLabel, Select, MenuItem, Menu, Typography, MenuList } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Pagination } from '@material-ui/lab';
import {
  addNotificationAPI, getNotificationAPI, getLengthNotification, deleteNotificationAPI, updateNotificationAPI
} from '../../api/notificaitionAPI'
import {
  getDepartmentUserByID,
} from '../../api/authAPI'
import UserProfile from '../../userProfile/UserProfile';
import { FaceRounded, MoreHoriz } from '@material-ui/icons'
export default function HomeComponent({ router, socket }) {
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
  const [fillter, setFillter] = useState()

  const [alldepartment, setAlldeparment] = useState()
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
        console.log(result)
        if (result.resultCode === 1) {
          getNotificationAPI({ limit: 10, page }).then(result => {
            if (result.resultCode === 1) {
              setNotification(result.data)
            }
          })
          handleClose()
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
    getDepartmentUserByID()
      .then(result => {
        if (result.resultCode === 1) {
          setdepartment(result.data.department)
          console.log(result)
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

    if (fillter)
      getNotificationAPI({ limit: 10, page }).then(result => {
        if (result.resultCode === 1) {
          setNotification(result.data)
        }
      })

  }, [page])

  const limitText = (text) => {

    if (text.length > 80) {
      text = text.substr(0, 80) + '...';
    }
    return text;
  }
  return (
    <div className='flex flex-col w-full overflow-y-scroll items-center bg-gray-200'>

      <Pagination style={{
        marginTop: 20
      }} count={Math.ceil(length / 10)} showFirstButton showLastButton onChange={(event, value) => {
        setPage(parseInt(value) - 1);
      }} >
      </Pagination>
      {UserProfile.data?.role === "2" && <Typography style={{
        margin: 20
      }}>  <button type="button" onClick={() => setaddnotification(true)}>
          Tạo Bài Viết</button>
      </Typography>}
      {/* <FormControl style={{
        marginBottom: 20,
        marginLeft: 20,
        width: "90%",
      }}>

        <InputLabel id="demo-simple-select-helper-label">Phòng Ban</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={selectdepartment}
          onChange={(event) => {
            if (event.target.value = "tatca")
              setselectdepartment(event.target.value)

          }}
        >
          <MenuItem value="tatca">
            Tất Cả
            </MenuItem>
          {department.map((item) =>
            <MenuItem value={item._id}>
              {item.label}
            </MenuItem>
          )}
        </Select>
      </FormControl> */}
      {
        notification?.map((item) =>
          <div style={{
            borderLeft: 1,
            borderLeftStyle: "solid",
            justifyContent: "flex-start",
            marginLeft: 20,
            width: "90%",
            marginBottom: 20

          }} className='flex flex-col w-full  bg-white  p-6'>

            <div className='w-full'>
              <div
                className='flex'
              >
                <p className='font-medium flex-1' >{item.title}</p>
                {UserProfile.data.id == item.uid._id && <Button
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
                handleEdit(item._id, item.title, item.content,)
              }}>Edit</MenuItem>
              <MenuItem onClick={() => {
                handleDelete(item._id)
              }}>Delete</MenuItem>
            </Menu>
            <p>
              {limitText(item.content)}
            </p>
            <a
              onClick={() => { router.push({ pathname: "detailnofication", query: { _id: item._id } }) }}
              style={{
                color: "blue"
              }}>Chi tiết thông báo</a>
            <div className='text-right' style={{
            }}>
              <p style={{
                fontStyle: "italic",
                textAlign: 'right'
              }}
                className='text-gray-500'>{item && item.department.label} | Ngày Đăng {item && new Date(item.createdAt).toISOString().replace(/T.*/, '').split('-').reverse().join('-')}
              </p>
            </div>
          </div>
        )
      }

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
                      uid: UserProfile.data.id,
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
                  {department.map((item) =>
                    <MenuItem value={item._id}>
                      {item.label}
                    </MenuItem>
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
    </div >

  )

}