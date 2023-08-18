import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { loginThunk } from '../../thunks/auth-thunks';

const defaultTheme = createTheme();
// const defaultTheme = createTheme();
const LoginComponent = () =>{
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [loginStauts, setLoginStatus ] = useState(null);
    const [errors, setErrors] = useState({
      username: false,
      password: false
    })
    const clickSubmitHandler = async (event) =>{
        event.preventDefault()
        const data = new FormData(event.currentTarget)

        const newErrors = {}
        if(data.get('username') === ''){
          newErrors['username']  = true;
        }
        
        if(data.get('password') === ''){
          newErrors['password'] = true;
        }

        setErrors(newErrors)

        if(Object.values(newErrors).some((error) => error)){
          return;
        }
        const authData = {
            username:data.get('username')
            ,password:data.get('password')
        }

        const response = await dispatch(loginThunk(authData))
        if(response.error){
          setLoginStatus('error');
        }else{
          setLoginStatus('success');
          navigate("/")
        }
        
    };
    return(
       <ThemeProvider theme={defaultTheme}>
            <Container component='main' maxWidth="xs">
                <CssBaseline/>
                <Box
                sx={{
                    marginTop:8,
                    display:'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={clickSubmitHandler} noValidate sx={{ mt: 1 }}>
            {loginStauts === "error" && (
              <Typography variant='body3' color='error'>Incorrect Username or Password. Please Try Again.</Typography>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              helperText={errors.username ? 'Field cannot be empty' : ''}
                    sx={{
                      '& .MuiFormHelperText-root': {
                        color: errors.username ? 'red' : 'inherit', 
                      },
                    }}
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
              helperText={errors.password ? 'Field cannot be empty' : ''}
                    sx={{
                      '& .MuiFormHelperText-root': {
                        color: errors.password ? 'red' : 'inherit', 
                      },
                    }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="#/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
                </Box>
            </Container>
        </ThemeProvider>

        
    );

}

export default LoginComponent