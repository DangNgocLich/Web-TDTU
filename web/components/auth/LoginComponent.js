import { Box, Button, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import Image from 'next/image'
import { loginAPI } from '../../api/authAPI'
import cookie from 'react-cookies'
export default function LoginComponent({ router }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className='flex flex-col w-screen h-screen justify-center items-center bg-gradient-to-r from-green-400 to-blue-500'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginAPI({ username: email, password })
            .then(result => {
              console.log(result)
              if (result.resultCode === 1){
                cookie.save('accessToken', result.accessToken)
                
                return router.push('/')
              }
            })
        }}
        className='flex flex-col w-full md:w-96 bg-white rounded-xl p-12'>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ marginBottom: 20 }}
          className='w-full'
          variant='outlined'
          label="Email"
          placeholder="Enter email"
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 20 }}
          className='w-full'
          variant='outlined'
          label="Password"
          placeholder="Enter password"
          type='password'
        />
        <Button
          style={{ marginBottom: 20 }}
          variant='contained'
          color='primary'
          type='submit'
        >
          Login
        </Button>
        <a href='api/auth/google' className='flex justify-center items-center'>
          <Image src='/icons/gmail_icon.png' layout='fixed' width='50' height='50' />
          <p className='ml-2'>Login with Gmail</p>
        </a>
      </form>
    </div>
  )

}