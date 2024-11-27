import React from 'react'
import {Box, Typography} from '@mui/material'
import { useSelector } from 'react-redux'
import checkAuth from '../hoc/checkAuth';

function Home() {
  const user= useSelector(state=> state.auth.user)

  return (
    
    <Box>
        <Typography variant ="h1">Hello, {user?.name ?? "Guest"}</Typography>
    </Box>
  )
}

export default checkAuth(Home)