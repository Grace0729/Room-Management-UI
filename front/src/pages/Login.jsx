import React, { useState } from 'react'
import {Box, Typography, TextField, Button} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import { login as loginAPI} from '../api/auth'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'
import { toast } from 'react-toastify'
import loginImage from './image/mfi-logo.png'

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [cookies,setCookie,removeCookie] = useCookies()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit = (e) =>{
    e.preventDefault()
    loginAPI({
      email: $("#email").val(),
      password: $("#password").val(),
    }).then(res => {
      if(res?.ok){
        setCookie("AUTH_TOKEN", res.data.token)
        dispatch(login(res.data))
        navigate("/")
        toast.success(res?.message ?? "Logged in successfully!")
      }
      else{
        toast.error(res?.message ?? "Something Went Wrong!")
      }
    })
  }
  return (
<Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
<Box sx={{width:'450px', height:'300px', borderRadius: '20px', padding:'20px',boxShadow:'1px 1px 10px 1px grey'}}>

            <Typography variant='h4' sx={{ textAlign: 'center', mb: 2,fontFamily:'Georgia'}}>
              Login
            </Typography>

            <Box sx={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gridTemplateRows: 'repeat(2, 100px)', marginBottom:'10px',height:'180px'}}>
            <Box>
              <Typography variant='h4' sx={{ textAlign: 'center'}}>
                <img src={loginImage} alt="Login" width="170px" />
              </Typography>
             </Box>

          <Box component="form" onSubmit={onSubmit} sx={{ mt: 2 }}>
            <Box>
              <TextField onChange={(e) => setEmail(e.target.value)} value={email} id="email" fullWidth size="small" label="Email"type="email" sx={{mt:1}}/>
            </Box>

            <Box sx={{ mt: 2 }}>
               <TextField onChange={(e) => setPassword(e.target.value)} value={password} id="password" fullWidth size="small" label="Password" type="Password"/>
            </Box>

              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Button type="submit" variant="contained">Login</Button>
              </Box>
              </Box>
          </Box>
              <Box sx={{ textAlign:'center'}}>
                  <Typography sx={{fontFamily:'Georgia'}}>Don't have an account yet?</Typography>
                <Link to="/register" >
                  <Typography sx={{fontFamily:'Georgia'}}><u>Sign Up</u></Typography>
                </Link>
              </Box>
             
        </Box>
    </Box>
  )
}
