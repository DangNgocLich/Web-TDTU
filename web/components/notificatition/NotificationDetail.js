// import { Button, Modal, TextField, TextareaAutosize, FormControl, InputLabel, Select, MenuItem, FormHelperText } from '@material-ui/core'
// import React, { useEffect, useState } from 'react'
// import { Pagination } from '@material-ui/lab';
// import {
//   addNotificationAPI,
//   getNotificationAPI,
//   getLengthNotification
// } from '../../api/notificaitionAPI'
// import {
//   getDepartmentUserByID,
// } from '../../api/authAPI'

// export default function NotificationDetail({ router, cookies }) {
//   const [title, settitle] = useState('')
//   const [addnotification, setaddnotification] = useState(false)
//   const [content, setcontent] = useState('')
//   const [department, setdepartment] = useState([])
//   const [selectdepartment, setselectdepartment] = useState()
//   const [notification, setNotification] = useState()
//   const [page, setPage] = useState(0)
//   const [length, setlength] = useState(1)
//   useEffect(() => {
//     getNotificationByIdAPI()
//       .then(result => {
//         if (result.resultCode === 1) {
//           setdepartment(result.data.department)
//         }
//       })

//   }, [])
//   return (
//     <div className='flex flex-col w-full overflow-y-scroll items-center bg-gray-200'>

//       {notification?.map((item) =>
//         <div style={{
//           borderLeft: 1,
//           borderLeftStyle: "solid",
//           justifyContent: "flex-start",
//           marginLeft: 20,
//           width: "90%",
//           marginBottom: 20
//         }} className='flex flex-col w-full  bg-white  p-6'>
//           <InputLabel
//             style={{
//               fontSize: 25,
//               color: "blue"
//             }} id="demo-simple-select-helper-label">{item.title}</InputLabel>
//           <p>
//             {limitText(item.content)}
//           </p>
//           <div className='text-right' style={{
//           }}>
//             <p style={{
//               fontStyle: "italic",
//               textAlign: 'right'
//             }}
//               className='text-gray-500'>{notification && notification[0].department.label} | Ngày Đăng {notification && new Date(notification[0].createdAt).toISOString().replace(/T.*/, '').split('-').reverse().join('-')}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>

//   )

// }
