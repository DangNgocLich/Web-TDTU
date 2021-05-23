
import React, { useState } from 'react'
export default function Fail({ router }) {
  return (
    <div className='flex flex-col w-screen h-screen justify-center items-center bg-gradient-to-r from-green-400 to-blue-500'>
      <h1>Vui Lòng Đăng Nhập bằng Tài Khoản student</h1>
      <a
        onClick={() => { router.push({ pathname: "/login" }) }}>
        Bấm Vào đây để về trang đăng nhập
      </a>
    </div>
  )

}