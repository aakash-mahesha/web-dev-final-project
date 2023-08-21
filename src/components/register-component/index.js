import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Routes, Route, useNavigate } from "react-router";
import UserRegisterPage from "./user-register";
import { Link } from 'react-router-dom';
import tabs from './tabs.json'
import { useState } from "react";
import OrgRegisterPage from "./org-user-register";
import { useDispatch } from "react-redux";
import { registerThunk } from "../../thunks/auth-thunks";


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
      setRegisterStatus("error")
    }else{
      setRegisterStatus("success")
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
            <Typography component="h1" variant="h5">
              Register
            </Typography>
            <div>
              <div className="button-group">
                <Link to="/register/userRegister" >
                  <Button className="button-tile" variant="outlined" sx={{mt:3}}>
                    Regular User
                  </Button>
                </Link>
                <Link to="/register/orgRegister">
                  <Button className="button-tile" variant="outlined" sx={{mt:3}}>
                    Organization
                  </Button>
                </Link>
              </div>
            </div>
            {registerStatus === "error" &&
            <Typography component="h1" variant="h5" color="error" sx={{mt:3}}>Username already in use.Try a different username</Typography>}
            <Routes>
              <Route path="/userRegister" element={<UserRegisterPage interestTabsList = {interestTabsList} onSubmit= {handleFormSubmit}/>}/>
              <Route path="/orgRegister"  element= {<OrgRegisterPage interestTabsList= {interestTabsList} onSubmit={handleFormSubmit}/>}/>
            </Routes>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
}

