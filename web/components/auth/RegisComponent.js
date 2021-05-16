import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { regisAPI } from '../../api/authAPI'
import {
  getDepartmentAPI
} from '../../api/department'
import ButtonCheckboxMenu from '../home/ButtonCheckboxMenu'
export default function RegisComponent({ router }) {
  const [username, setUsername] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [password, setPassword] = useState('')
  const [listdepartment, setListdepartment] = useState([])
  const [department, setdepartment] = useState([])
  useEffect(() => {
    getDepartmentAPI().then(result => {
      if (result.resultCode === 1 && listdepartment !== result.data) {
        setListdepartment(result.data)
      }
    })
  }, [listdepartment])
  return (
    <div className='flex flex-col w-screen h-screen justify-center items-center bg-gradient-to-r from-green-400 to-blue-500'>
      <form
        style={{
          width: "80%",

        }}
        onSubmit={(e) => {
          e.preventDefault();

          let department = []
          department.forEach(element => {
            let temp = listdepartment.filter((item) => item.label === element)
            department.push(temp[0])
          });
          regisAPI({
            username,
            password,
            displayName,
            department
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
          type="password"
          placeholder="Enter password"
        />
        <div style={{
          width: "100%"
        }}>
          <ButtonCheckboxMenu data={listdepartment.map((x) => x.label)} handleSelect={(event) => setdepartment(event)}></ButtonCheckboxMenu>

        </div>
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