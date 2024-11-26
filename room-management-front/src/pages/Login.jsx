import React from 'react'
import {Box, Typography, TextField, Button} from '@mui/material'
import { Link } from 'react-router-dom'
// import loginImage from '../pages/image'

export default function Login() {
  // const onSubmit = () =>{

  // }
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box sx={{height:400, width:800,boxShadow:'#01411C 5px 5px 20px 5px',borderRadius:'20px',backgroundColor:'White',display:'grid',gridTemplateColumns:' repeat(auto-fit, minmax(150px, 1fr))',gridTemplateRows:'repeat(3, 200px)',gap:'20px',padding:'20px'}}>
            <Typography variant='h4' sx={{ textAlign: 'center', mt: 10, fontWeight: 'bold' }}>
                Member Login
            </Typography>

            <Box sx={{ mt: 2 }}>
              <TextField id="username" fullWidth size="small" label="Username"/>
            </Box>

            <Box sx={{ mt: 2 }}>
              <TextField id="email" fullWidth size="small" label="Email"type="email"/>
            </Box>

            <Box sx={{ mt: 2 }}>
               <TextField id="password" fullWidth size="small" label="Password" type="Password"/>
            </Box>

              <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button variant="contained">Login</Button>
              </Box>

            <Box sx={{mt:2, textAlign:'center '}}>
              <Link to="/register" >
                <Typography>Don't have an account yet</Typography>
              </Link>
            </Box>

            {/* <Box>
              <Typography variant='h4' sx={{ textAlign: 'center', mt: 3, fontWeight: 'bold' }}>
                <img src={loginImage} alt="Login" width="350px" />
              </Typography>
             </Box> */}
             
        </Box>
    </Box>
  )
}
