import React, {useState} from 'react';
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
import {useSelector, useDispatch} from 'react-redux'
import CircularProgress from '@mui/material/CircularProgress';
import { login, resetStatus } from '../redux/userSlice'
import { useNavigate } from 'react-router-dom'

export default function Login() {

  const user = useSelector(state => state.user)
  const message = useSelector(state => state.user.message)
  const status = useSelector(state => state.user.status)

  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (status === 'fulfilled') {
      dispatch(resetStatus())
      navigate("/")
    }
  }, [status])

  const [isChecked, setIsChecked] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let userObj = {
      email: data.get('email'),
      password: data.get('password'),
      isRemember: isChecked
    }
    console.log(userObj);

    dispatch(login(userObj))

  };

  return (
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
            Log In
          </Typography>
          {
            status && 
            <Typography component='h2' variant="h6" sx={{color: 'orange'}}>
            {message}
          </Typography>
          }
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error = {message === "User Not Found" ? true : false}
              helperText = {message === "User Not Found" ? message : false}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error = {message === "Incorrect Password" ? true : false}
              helperText = {message === "Incorrect Password" ? message : false}
            />
            <FormControlLabel
              control={
              <Checkbox 
                value="remember"  
                color="primary" 
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />}
              label="Remember Me"
              
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {
                status === 'pending' ? 
                  <CircularProgress />
                  :
                  'Log In'
              }
              
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Please Register"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}