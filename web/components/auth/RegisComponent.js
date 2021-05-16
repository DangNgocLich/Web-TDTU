import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { regisAPI } from '../../api/authAPI'
import {
  getDepartmentAPI
} from '../../api/department'
export default function RegisComponent({ router }) {
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [Arraydepartment, setArraydepartment] = useState([])
  const [department, setdepartment] = useState([])

  useEffect(() => {
    getDepartmentAPI().then(result => {
      if (result.resultCode === 1 && Arraydepartment !== result.data) {
        setArraydepartment(result.data)
      }
    })
  }, [Arraydepartment])
  return (
    <div className='flex flex-col w-screen h-screen justify-center items-center bg-gradient-to-r from-green-400 to-blue-500'>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          regisAPI({
            username,
            password,
            displayName
          }).then(result => {
            if (result.resultCode === 1) {
              alert("Sign in success")
              return router.push('/login')
            }
            alert(result.message)
          })
        }}
        className='flex flex-col w-full md:w-96 bg-white rounded-xl p-12'>
        <InputLabel style={{
          marginBottom: 20,
          fontSize: 30
        }}>Tạo Tài Khoản</InputLabel>
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
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-age-native-simple">Phòng Ban</InputLabel>
          <Select
            native
            label="Phòng Ban"
            style={{ marginBottom: 20 }}
            onSelect={(value) => console.log(value)}
            // onChange={(value) => {
            //   let data = Arraydepartment.filter((item) => item.value !== value.target.value)

            //   setArraydepartment([])
            // }}
            >
              <option aria-label="None" value="" />
            { Arraydepartment.map((item, idx) => <option value={item.value}>{item.label}</option>) }
          </Select>
        </FormControl>
      <InputLabel style={{ marginBottom: 20 }} htmlFor="outlined-age-native-simple">Phòng Ban : </InputLabel>
      <Button
        style={{ marginBottom: 20 }}
        variant='contained'
        color='primary'
        type='submit'
      >
        Sign In
        </Button>
      </form>
    </div >
  )

}