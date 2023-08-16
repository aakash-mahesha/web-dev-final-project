import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red } from "@mui/material/colors";
import { Padding } from "@mui/icons-material";
import { Routes, Route, useNavigate } from "react-router";
import UserRegisterPage from "./user-register";
import { Link } from 'react-router-dom';
import tabs from './tabs.json'
import { useState } from "react";
import OrgRegisterPage from "./org-user-register";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../thunks/auth-thunks";

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

const interestTabsList = tabs;
const defaultTheme = createTheme();

export default function Register() {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [registerStatus, setRegisterStatus] = useState("");

  const handleFormSubmit = async (data) =>{
    console.log("in handleFormSubmit in index.js")
    const response = await dispatch(registerThunk(data))
    if(response.error){
      setRegisterStatus('error')
    }else{
      setRegisterStatus('success')
      navigate("/")
    }
  }
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xl">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h3">
              Register
            </Typography>
            <div>
              <div className="button-group">
                <Link to="/register/userRegister">
                  <Button className="button-tile" variant="outlined">
                    Regular User
                  </Button>
                </Link>
                <Link to="/register/orgRegister">
                  <Button className="button-tile" variant="outlined">
                    Organization
                  </Button>
                </Link>
              </div>
            </div>
            <Routes>
              <Route path="/userRegister" element={<UserRegisterPage interestTabsList = {interestTabsList} onSubmit= {handleFormSubmit}/>}/>
              <Route path="/orgRegister"  element= {<OrgRegisterPage interestTabsList= {interestTabsList} onSubmit={handleFormSubmit}/>}/>
              {/* <Route path="/adminRegister"/> */}
            </Routes>
            {/* <UserRegisterPage/> */}
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
