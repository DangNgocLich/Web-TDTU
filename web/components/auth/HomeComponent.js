import { Box, Button, TextField } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { regisAPI } from '../../api/authAPI'
import { verifyToken } from '../../../server/helpers/jwt.helper'
import { accessTokenSecret } from '../../../server/middleware/AuthMiddleware'
import { getUsersAPI,getUsersByIdAPI } from '../../api/authAPI'
export default function HomeComponent({ router }) {

  useEffect(() => {
    // loginAPI({ username: email, password })
    // .then(result => {
    //   if (result.resultCode === 1){
    //     cookie.save('accessToken', result.accessToken)
    //     return router.push('/')
    //   }
    // })
  })
  return (
    <div className='flex flex-col w-screen h-screen justify-center items-center bg-gradient-to-r from-green-400 to-blue-500'>

    </div>
  )

}