import * as React from 'react';
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
import { red } from '@mui/material/colors';
import { Padding } from '@mui/icons-material';
// import { Email } from '@mui/icons-material';

// function Copyright(props) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="https://mui.com/">
//         Your Website
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

const defaultTheme = createTheme();

const handleRegisterSubmit = ()=>{
  return null
}

export default function Register() {


  return(
      <>
        <ThemeProvider theme = {defaultTheme}>
          <Container component="main" maxWidth="xl">
            <CssBaseline/>
            <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width:'100%'
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar> 
            <Typography component="h1" variant="h3">
              Register
            </Typography>

              <Box component="form" noValidate onSubmit={handleRegisterSubmit} sx={{mt:3, width:"100%"}}>
                <Grid container spacing={3} maxWidth="xl" sx={{marginTop:3}}>
                  <Grid item xs={12} sm={12} md={6} sx={{justifyContent:'start'}}>
                    <Grid container sx={{display:'flex', flexDirection: 'column'}}>
                      <Typography component="h1" variant="h4" sx={{mb:2}}> Enter your details </Typography>
                      <Grid container spacing={4}>
                        <Grid item xs={12} sm = {12} md={6} sx={{ marginBottom: { xs: -2, sm: -2, md: 2 } }}>
                          <TextField
                            autoComplete="given-name"
                            name= "firstname"
                            required
                            fullWidth
                            id="firstName"
                            label="Enter First Name"
                            placeholder='First Name'
                            autoFocus
                            />
                        </Grid>

                        <Grid item xs={12} sm = {12} md={6} sx={{ marginBottom: 2 }}>
                          <TextField
                          autoComplete="family-name"
                          name= "lastname"
                          required
                          fullWidth
                          id="lastName"
                          label="Enter Last Name"
                          placeholder='Last Name'
                          autoFocus
                          />
                        </Grid>
                      </Grid>
                      
                      <Grid item xs={12} sx={{mb:2}}>
                      <TextField
                          // autoComplete="given-name"
                          name= "username"
                          required
                          fullWidth
                          id="userName"
                          label="Enter Username"
                          placeholder='Username'
                          autoFocus
                      />
                      </Grid>
                      <Grid item xs={12} sx={{mb:2}}>
                      <TextField
                          autoComplete="email"
                          name= "Email"
                          required
                          fullWidth
                          id="email"
                          label="Enter Email"
                          placeholder="youremail@xyz.com"
                          autoFocus
                          type="email"
                      />
                      </Grid>
                      <Grid item xs={12} sx={{mb:2}}>
                      <TextField
                          // autoComplete="given-n"
                          name= "Password"
                          required
                          fullWidth
                          id="password"
                          label="Enter Password"
                          placeholder="password"
                          autoFocus
                          type="password"
                      />
                      </Grid>
                      <Grid item xs={12} sx={{mb:2}}>
                      <TextField
                          // autoComplete="given-name"
                          name= "Confirm Password"
                          required
                          fullWidth
                          id="confirmPassword"
                          label="Confirm Password"
                          placeholder="confirm password"
                          autoFocus
                          type="password"
                      />

                      </Grid>
                      
                      <Grid item xs={12} sx={{mb:2}}>
                      <TextField
                          autoComplete="address-line1"
                          name= "address-line1"
                          required
                          fullWidth
                          id="address-line1"
                          label="Address"
                          placeholder="Address"
                          autoFocus
                      />
                      </Grid>
                      
                      <Grid item xs={12} sx={{mb:2}}>
                      <TextField
                          autoComplete="address-line2"
                          name= "address-line2"
                          required
                          fullWidth
                          id="address-line2"
                          label="Apt/Unit No."
                          placeholder="Ex: Apt 3 or Unit 2"
                          autoFocus
                      />
                      </Grid>
                      <Grid item xs={12} sx={{mb:2}}>
                        <TextField
                        required
                        fullWidth
                        id="city"
                        label="City"
                        name="city"
                        autoComplete="address-level2"
                      />
                      </Grid>
                    </Grid>
                  </Grid>



                  <Grid item xs={12} sm={12} md={6} >
                    <Typography component="h1" variant="h4" sx={{mb:2}}> Select the tags that interest you!</Typography>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>

      </>
  );
}

























// export default function Register() {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

  // return (
  //   <ThemeProvider theme={defaultTheme}>
  //     <Container component="main" maxWidth="xs">
  //       <CssBaseline />
  //       <Box
  //         sx={{
  //           marginTop: 8,
  //           display: 'flex',
  //           flexDirection: 'column',
  //           alignItems: 'center',
  //         }}
  //       >
  //         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
  //           <LockOutlinedIcon />
  //         </Avatar>
  //         <Typography component="h1" variant="h5">
  //           Sign up
  //         </Typography>
  //         <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
  //           <Grid container spacing={2}>
  //             <Grid item xs={12} sm={6}>
  //               <TextField
  //                 autoComplete="given-name"
  //                 name="firstName"
  //                 required
  //                 fullWidth
  //                 id="firstName"
  //                 label="First Name"
  //                 autoFocus
  //               />
  //             </Grid>
  //             <Grid item xs={12} sm={6}>
  //               <TextField
  //                 required
  //                 fullWidth
  //                 id="lastName"
  //                 label="Last Name"
  //                 name="lastName"
  //                 autoComplete="family-name"
  //               />
  //             </Grid>
  //             <Grid item xs={12}>
  //               <TextField
  //                 required
  //                 fullWidth
  //                 id="email"
  //                 label="Email Address"
  //                 name="email"
  //                 autoComplete="email"
  //               />
  //             </Grid>
  //             <Grid item xs={12}>
  //               <TextField
  //                 required
  //                 fullWidth
  //                 name="password"
  //                 label="Password"
  //                 type="password"
  //                 id="password"
  //                 autoComplete="new-password"
  //               />
  //             </Grid>
  //             <Grid item xs={12}>
  //               <FormControlLabel
  //                 control={<Checkbox value="allowExtraEmails" color="primary" />}
  //                 label="I want to receive inspiration, marketing promotions and updates via email."
  //               />
  //             </Grid>
  //           </Grid>
  //           <Button
  //             type="submit"
  //             fullWidth
  //             variant="contained"
  //             sx={{ mt: 3, mb: 2 }}
  //           >
  //             Sign Up
  //           </Button>
  //           <Grid container justifyContent="flex-end">
  //             <Grid item>
  //               <Link href="#/login" variant="body2">
  //                 Already have an account? Sign in
  //               </Link>
  //             </Grid>
  //           </Grid>
  //         </Box>
  //       </Box>
  //       {/* <Copyright sx={{ mt: 5 }} /> */}
  //     </Container>
  //   </ThemeProvider>
  // );
// }