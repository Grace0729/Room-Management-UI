import React, { useState } from 'react'
import {Box, Typography, TextField, Button} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import { register } from '../api/auth'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'

export default function Register() {

  const[warnings, setWarnings] = useState({})
  const[loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const[cookies, setCookies, removeCookies] = useCookies()
  const dispatch = useDispatch()

  const onSubmit = (e) =>{
      e.preventDefault()
      if(!loading){
        const body={ 
          name: $("#name").val(),
          email:$("#email").val(),
          password:$("#password").val(),
          password_confirmation:$("#password_confirmation").val(),
        }
        setLoading(true)
        register(body).then(res =>{

          if (res?.ok){
              toast.success(res?.message ?? "Account Has Been Registed")
              setCookies("AUTH_TOKEN",res.data.token)
              dispatch(login(res.data))
              navigate("/")
          }
          else{
            toast.error(res?.message ?? "Something went wrong")
            setWarnings(res?.data)
          }
        }).finally(() => {
            setLoading(false)
        })
      }
  }

return (
<Box sx={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {/* <Box sx={{height:400, width:800,boxShadow:'#01411C 5px 5px 20px 5px',borderRadius:'20px',backgroundColor:'White',display:'grid',gridTemplateColumns:' repeat(auto-fit, minmax(150px, 1fr))',gridTemplateRows:'repeat(3, 200px)',gap:'20px',padding:'20px'}}> */}
        <Box sx={{height:400, width:400,boxShadow:'#01411C 5px 5px 20px 5px',borderRadius:'20px', padding:'10px'}}>

            <Typography variant='h4' sx={{ textAlign: 'center'}}>
              Register
            </Typography>

            <Box component="form" onSubmit={onSubmit} >
            <Box sx={{ mt: 5 }}>
              <TextField required id="name" fullWidth size="small" label="Username"/>
              {
                warnings?.name ? (
                  <Typography sx={{fontSize: 12}}component="small" color="error">{warnings.name}</Typography>
                ) : null
              }
            </Box>

            <Box sx={{ mt: 2 }}>
              <TextField required id="email" fullWidth size="small" label="Email"type="email"/>
              {
                warnings?.email ? (
                  <Typography sx={{fontSize: 12}}component="small" color="error">{warnings.email}</Typography>
                ) : null
              }
            </Box>

            <Box sx={{ mt: 2 }}>
               <TextField required id="password" fullWidth size="small" label="Password" type="Password"/>
               {
                warnings?.password ? (
                  <Typography sx={{fontSize: 12}}component="small" color="error">{warnings.password}</Typography>
                ) : null
              }
            </Box>
            
            <Box sx={{ mt: 2 }}>
               <TextField required id="password_confirmation" fullWidth size="small" label="Repeat Password" type="Password"/>
            </Box>

              <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button disabled={loading} type="submit" variant="contained">Register</Button>
              </Box>
            <Box sx={{mt:2, textAlign:'center '}}>
            <Link to="/Login" >
                <Typography>
                  Already have an account
                </Typography>
            </Link>
            </Box>
            </Box>
{/* 
            <Box>
              <Typography variant='h4' sx={{ textAlign: 'center', mt: 3, fontWeight: 'bold' }}>
                <img src={loginImage} alt="Login" width="350px" />
              </Typography>
             </Box> */}
        </Box>
    </Box>
  )
}
