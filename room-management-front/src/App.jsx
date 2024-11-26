import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/Login'
import Register from './pages/Register'
function App() {
  const router= createBrowserRouter([
    {
      path:'/',
      element:<Home/>
    },
    {
      path:'/login',
      element:<Login/>
    },
    {
      path:'/register',
      element:<Register/> 
    },
  ])
 

  return ( 

      <RouterProvider router={router}>

      </RouterProvider>
  )
  }
export default App
