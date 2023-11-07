import React from 'react'
import { Container, Box, Typography, Link } from '@mui/material'

import { useDispatch, useSelector } from 'react-redux'
import { loginTest } from '../redux/userSlice'
import { authCheck } from '../redux/authSlice'


const Home = () => {
  // make a Redux store and userSlice
  // shouild be able to display user's name below
  // Hello World -> Hello Firstname - Hello Paul

  const user = useSelector(state => state.user)
  const auth = useSelector(state => state.auth.isAuth)
  const dispatch = useDispatch()

  // testing the backend
  // React.useEffect(() => {
  //   dispatch(loginTest())
  // }, [])

  React.useEffect( () => {
    dispatch(authCheck())
  },[auth])

  
  
  return (
    <Container maxWidth='lg'>
        <Box >
            <Typography variant='h3'>
              { user.message && <>{user.message}<br /></>}
              {
              auth ? 
                <>Hello {user.firstname}</>
             :

                <>
                {/* {user.message === 'jwt expired' && <>Session Expired</>} <br/> */}
                Please <Link href='/login' variant="h3">Log in</Link> 
                {user.message !== 'Authentication Expired' && 
                <> or <Link href='/register'>Register</Link></> }
                 </>
            }</Typography>
        </Box>
    </Container>
  )
}

export default Home