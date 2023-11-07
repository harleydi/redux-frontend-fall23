import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';

import { useSelector, useDispatch} from 'react-redux'
import { register, resetStatus } from '../redux/userSlice';
import { validator } from '../lib/validator';

import {useNavigate} from 'react-router-dom'
// theme is in theme.jsx
// const defaultTheme = createTheme();

export default function Register() {

    const user = useSelector( state => state.user)
    const status = useSelector( state => state.user.status)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    
    React.useEffect(() => {
      if (status === 'fulfilled') {
        dispatch(resetStatus())
        navigate("/")
      }
    }, [status])

    const [isValid, setIsValid] = useState({
      firstname: {error: false, message: ''},
      lastname: {error: false, message: ''},
      email: {error: false, message: ''},
      password: {error: false, message: ''}
    })

    const [pwdMatch, setPwdMatch] = useState({
        error: false,
        message: ""
    })





  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userObj = {
        firstname: data.get('firstName'),
        lastname: data.get('lastName'),
        email: data.get('email'),
        password: data.get('password')
      }
    // console.log('____userObj____')
    // console.log(userObj);

    if (userObj.password !== data.get('confirm-password')) {
        setPwdMatch({
            error: true,
            message: "Password doesn't Match!"
        })
    } else {
        setPwdMatch({
            error: false,
            message: ""
        })

    }
    // call validator function and check for errors
    // if there are errors
    //  a) display errors
    //  b) do not dispatch

    const validatedObj = validator(userObj)
    console.log(validatedObj)

    let isErrors = false
    for (const key in validatedObj) {
      if (validatedObj[key].error) {
        isErrors = true
      }  
    }  

    isErrors ? 
    setIsValid(validatedObj)
    :
    (userObj.password === data.get('confirm-password')) && dispatch(register(userObj))




    // (userObj.password === data.get('confirm-password')) && dispatch(register(userObj))
  };



  return (
    // ThemeProvider is in main.jsx
    // <ThemeProvider theme={defaultTheme}>  
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          { user.status === 'rejected' && 
                <Typography
                    variant="h6"
                    sx={{
                        color: 'red',
                        textAlign: 'center'
                    }}
                >{user.message}</Typography>}
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error = {isValid.firstname.error}
                  helperText = {isValid.firstname.message}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error = {isValid.lastname.error}
                  helperText = {isValid.lastname.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error = {isValid.email.error}
                  helperText = {isValid.email.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error = {isValid.password.error}
                  helperText = {isValid.password.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm-password"
                  label="Confirm Password"
                  type="password"
                  id="confirm-password"
                  error={pwdMatch.error}
                  helperText={pwdMatch.message}
                />
              </Grid>
              
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {
                status === 'pending' ?
                <CircularProgress color="secondary" /> :
                "Register"
              }
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Please Log in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>

      </Container>
    // </ThemeProvider>
  );
}