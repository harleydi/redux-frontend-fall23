import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

// React Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/Root'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'


// Logout
// 1) Logout button in Navbar
// 2) Click on Logout does
//    a) dispatches logout in authSlice
//      i) isAuth set to false
//      ii) Clear user state in userSlice via thunkAPI
//      iii) delete token
//      iv) delete headers 
// 3) navigate to Home
//    a) bonus: clear the history

        

function App() {
  
 const router = createBrowserRouter([
  {
    path: '/',
    element:  <Root />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/register",
        element: <Register />
      }
    ]
  }
 ])

  return (
    <RouterProvider router={router} />
  )
}

export default App