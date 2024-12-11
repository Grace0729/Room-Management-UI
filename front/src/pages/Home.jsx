import React from 'react'
import {Box, Typography} from '@mui/material'
import { useSelector } from 'react-redux'
import checkAuth from '../hoc/checkAuth';
import Calendar from '../component/calendar'

function Home() {
  const user= useSelector(state=> state.auth.user)

  return (
    <Box>
        <Typography variant ="h1">Hello, {user?.name ?? "Guest"}</Typography>
        <Calendar/>
    </Box>
  )
}

export default checkAuth(Home)