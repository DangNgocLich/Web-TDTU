import { Button, ButtonBase, Collapse, List, ListItemText } from '@material-ui/core';
import { ExpandLess, ExpandMore, Home, List as ListIcon } from '@material-ui/icons'
import React from 'react'

const menu = [
  {
    icon: ListIcon,
    title: "Phân loại thông báo",
    child: [
      {
        title: "Phòng ban",
        onClick: (router) => router.push('/phongban')
      },
      {
        title: "Chủ đề",
        onClick: (router) => router.push('/chude')
      }
    ]
  }
]

export default function LeftBar({ router }) {
  const [open, setOpen] = React.useState(menu.map(() => false));

  const handleOpen = (index) => {
    open[index] = !open[index]
    setOpen([...open])
  }

  return (
    <nav className={'min-w-72'} aria-label="mailbox folders">
      <List className='h-full bg-yellow-800'>
        <div className='w-full py-2 text-center text-white text-3xl font-bold bg-yellow-900'>
          <p>THÔNG BÁO</p>
        </div>
        <button className={'flex w-full p-2 text-left focus:outline-none text-white'} onClick={() => {
          router.push('/')
        }}>
          <Home /><div className = 'w-2 h-2' />Trang chủ
        </button>
        {
          menu.map((dad, dadIndex) => {
            return (
              <>
                <ContainItem {...dad} open={open[dadIndex]} onClick={() => handleOpen(dadIndex)} />
                <Collapse component="li" in={open[dadIndex]} timeout="auto" unmountOnExit>
                  <List disablePadding>
                    {dad.child.map(child => {
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
  const { open, onClick, className,icon, title } = props;
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
        <div className = 'w-2 h-2' />
        <ListItemText primary={title} translate={'no'} className='text-white' />
        {open != null ? open ? <ExpandLess htmlColor='white' /> : <ExpandMore htmlColor='white' /> : null}
      </button>
    </li>
  )
}