import React, { memo } from 'react'
import cookie from 'react-cookies'

function Header({router}) {

  function onLogout(){
    cookie.remove('accessToken')
    router.push('/login')
  }

  return(
    <div className = 'flex h-14 bg-blue-700 text-white'>
      <div className = 'flex-1 p-2'>
        TDTU
      </div>
      <button
        className = 'p-2'
        onClick = {onLogout}
      >
        Logout
      </button>
    </div>
  )
}

export default memo(Header)