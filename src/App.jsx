import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'

// React Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/Root'
import Home from './components/Home'


function App() {
  
 const router = createBrowserRouter([
  {
    path: '/',
    element:  <Root />,
    children: [
      {
        index: true,
        element: <Home />
      }
    ]
  }
 ])

  return (
    <RouterProvider router={router} />
  )
}

export default App