import { Box, Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import Image from 'next/image'
export default function LoginComponent(props) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='flex flex-col w-screen h-screen justify-center items-center bg-gradient-to-r from-green-400 to-blue-500'>
      <div className='flex flex-col w-full md:w-96 bg-white rounded-xl p-12'>
        <TextField
          value = {email}
          onChange = {(e) => setEmail(e.target.value)}
          style={{ marginBottom: 20 }}
          className='w-full'
          variant='outlined'
          label="Email"
          placeholder="Enter email"
        />
        <TextField
          value = {password}
          onChange = {(e) => setPassword(e.target.value)}
          style={{ marginBottom: 20 }}
          className='w-full'
          variant='outlined'
          label="Password"
          placeholder="Enter password"
        />
        <Button
          style={{ marginBottom: 20 }}
          variant='contained'
          color='primary'
          onClick = {() => {
            
          }}
        >
          Login
        </Button>
        <a href = 'api/auth/google' className='flex justify-center items-center'>
          <Image src='/icons/gmail_icon.png' layout='fixed' width='50' height='50' />
          <p className='ml-2'>Login with Gmail</p>
        </a>
      </div>
    </div>
  )

}