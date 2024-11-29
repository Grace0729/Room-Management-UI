import React, { useState } from 'react'
import {Box, Typography, TextField, Button} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import { register } from '../api/auth'
import { toast } from 'react-toastify'
import { useCookies } from 'react-cookie'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authSlice'
import logoImage from './image/mfi-logo.png'

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
<Box sx={{ height: 350, width: 350, border: '1px solid black', borderRadius: '20px', padding:'20px',boxShadow:'2px 2px 10px 2px #0C356A'}}>

            <Typography variant='h4' sx={{ textAlign: 'center', fontFamily:'Georgia'}}>
                Sign Up
            </Typography>
            
            <Box component="form" onSubmit={onSubmit} >
            <Box sx={{ mt: 2}}>
              <TextField required id="name" fullWidth size="small" label="Username" sx={{border:'1px solid black', borderRadius:'5px'}}/>
              {
                warnings?.name ? (
                  <Typography sx={{fontSize: 12}}component="small" color="error">{warnings.name}</Typography>
                ) : null
              }
            </Box>

            <Box sx={{ mt: 2}}>
              <TextField required id="email" fullWidth size="small" label="Email"type="email" sx={{border:'1px solid black', borderRadius:'5px'}}/>
              {
                warnings?.email ? (
                  <Typography sx={{fontSize: 12}}component="small" color="error">{warnings.email}</Typography>
                ) : null
              }
            </Box>

            <Box sx={{ mt: 2 }}>
               <TextField required id="password" fullWidth size="small" label="Password" type="Password" sx={{border:'1px solid black', borderRadius:'5px'}}/>
               {
                warnings?.password ? (
                  <Typography sx={{fontSize: 12}}component="small" color="error">{warnings.password}</Typography>
                ) : null
              }
            </Box>
            
            <Box sx={{ mt: 2 }}>
               <TextField required id="password_confirmation" fullWidth size="small" label="Repeat Password" type="Password" sx={{border:'1px solid black', borderRadius:'5px'}}/>
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
        </Box>
    </Box>
  )
}
