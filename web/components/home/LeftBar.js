import { Button, ButtonBase, Collapse, List, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore, Home, List as ListIcon } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import UserProfile from '../../userProfile/UserProfile';
import { verifyToken } from "../../../server/helpers/jwt.helper";
import cookie from 'react-cookies'
import { accessTokenSecret } from '../../../server/middleware/AuthMiddleware'
const menu = [
  {
    icon: ListIcon,
    title: "Phân loại thông báo",
    child: [
      {
        title: "Tất cả",
        onClick: (router) => router.push('/allnotification')
      },
      {
        title: "User",
        onClick: (router) => router.push('/user')
      }
    ]
  }
]


export default function LeftBar({ router }) {
  const [open, setOpen] = React.useState(menu.map(() => false));
  const [role, setRole] = React.useState(null);
  const handleOpen = (index) => {
    open[index] = !open[index]
    setOpen([...open])
  }
  useEffect(() => {
    verifyToken(cookie.load('accessToken'), accessTokenSecret).then(result => {
      setRole(result.data.role)
    })
  })
  return (
    <nav className={'min-w-72'} aria-label="mailbox folders">
      <List className='h-full bg-yellow-800'>
        <div className='w-full py-2 text-center text-white text-3xl font-bold bg-yellow-900'>
          <p>THÔNG BÁO</p>
        </div>
        <button className={'flex w-full p-2 text-left focus:outline-none text-white'} onClick={() => {
          router.push('/')
        }}>
          <Home /><div className='w-2 h-2' />Trang chủ
        </button>
        {
          menu.map((dad, dadIndex) => {
            return (
              <>
                <ContainItem {...dad} open={open[dadIndex]} onClick={() => handleOpen(dadIndex)} />
                <Collapse component="li" in={open[dadIndex]} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {dad.child.map(child => {
                      if (child.title == "Tất cả") {
                        return <ChildItem
                          {...child}
                          onClick={() => {
                            child.onClick(router)
                          }}
                        />
                      }
                      if (role == "3" && child.title == "User")
                        return <ChildItem
                          {...child}
                          onClick={() => {
                            child.onClick(router)
                          }}
                        />
                    })}
                  </List>
                </Collapse>
              </>
            )
          })
        }
      </List>
    </nav>
  )
}

function ChildItem(props) {
  const { open, onClick, className, icon, title } = props;
  return (
    <li>
      <button className={'w-full text-left focus:outline-none '} onClick={() => {
        onClick && onClick()
      }}>
        <ListItemText primary={title} style={{ marginLeft: 20 }} className='text-white' />
        {open != null ? open ? <ExpandLess htmlColor='white' /> : <ExpandMore htmlColor='white' /> : null}
      </button>
    </li>
  )
}

function ContainItem(props) {
  const { open, onClick, className, title, icon: Icon } = props;
  return (
    <li>
      <button className={'flex w-full p-2 text-left focus:outline-none text-white items-center'} onClick={() => {
        onClick && onClick()
      }}>
        <Icon />
        <div className='w-2 h-2' />
        <ListItemText primary={title} translate={'no'} className='text-white' />
        {open != null ? open ? <ExpandLess htmlColor='white' /> : <ExpandMore htmlColor='white' /> : null}
      </button>
    </li>
  )
}