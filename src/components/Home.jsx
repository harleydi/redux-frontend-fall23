import React from 'react'
import { Container, Box, Typography } from '@mui/material'

import { useSelector } from 'react-redux'


const Home = () => {
  // make a Redux store and userSlice
  // shouild be able to display user's name below
  // Hello World -> Hello Firstname - Hello Paul

  const user = useSelector(state => state.user)

  return (
    <Container maxWidth='lg'>
        <Box >
            <Typography variant='h1'>Hello {user.firstname}</Typography>
        </Box>
    </Container>
  )
}

export default Home