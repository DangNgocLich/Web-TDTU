import { Box, Button, TextField } from '@material-ui/core'
import React, {useState} from 'react'
import Image from 'next/image'
import { regisAPI } from '../../api/authAPI'
export default function RegisComponent({router}) {
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')

  return (
    <div className='flex flex-col w-screen h-screen justify-center items-center bg-gradient-to-r from-green-400 to-blue-500'>
      <form
        onSubmit = {(e) => {
          e.preventDefault();
          regisAPI({
            username,
            password,
            displayName
          }).then(result => {
            if(result.resultCode === 1){
              alert("Sign in success")
              return router.push('/login')
            }
            alert(result.message)
          })
        }}
        className='flex flex-col w-full md:w-96 bg-white rounded-xl p-12'>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ marginBottom: 20 }}
          className='w-full'
          variant='outlined'
          label="Username"
          placeholder="Enter username"
        />
        <TextField
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          style={{ marginBottom: 20 }}
          className='w-full'
          variant='outlined'
          label="Display name"
          placeholder="Enter display name"
        />
        <TextField
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ marginBottom: 20 }}
          className='w-full'
          variant='outlined'
          label="Password"
          placeholder="Enter password"
        />
        <TextField
          value={rePassword}
          onChange={(e) => setRePassword(e.target.value)}
          style={{ marginBottom: 20 }}
          className='w-full'
          variant='outlined'
          label="Repeat password"
          placeholder="Repeat password"
        />
        <Button
          style={{ marginBottom: 20 }}
          variant='contained'
          color='primary'
          type = 'submit'
        >
          Sign In
        </Button>
        <a href='api/auth/google' className='flex justify-center items-center'>
          <Image src='/icons/gmail_icon.png' layout='fixed' width='50' height='50' />
          <p className='ml-2'>Login with Gmail</p>
        </a>
      </form>
    </div>
  )

}