import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from '@mui/material/Avatar';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoginIcon from '@mui/icons-material/Login';
import DashboardIcon from '@mui/icons-material/Dashboard';

const UserLinks = () => {
    const { currentUser } = useSelector(state => state.auth);
    const navigate = useNavigate();

    // var currentUser = { details: { firstname: "alice" }, loggedIn: true }

    // console.log(currentUser)

    const handleRegister = () => navigate("/register");
    const handleLogin = () => navigate("/login");
    const handleDashboard = () => navigate("/dashboard");


    return (
        <Box
            sx={{ backgroundColor: "grey.300", py: 15 }}
        >
            {!currentUser.loggedIn &&
                (
                    <Grid container
                    >
                        <Grid item xs={6}
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="h6"
                                sx={{ mb: 2, color: "text.secondary" }}
                            >
                                New to the MapVerse?
                            </Typography>
                            <IconButton
                                variant="contained"
                                color="primary"
                                onClick={handleRegister}
                                sx={{ width: '300px', fontSize: '20px' }}
                            >
                                <PersonAddIcon sx={{ mr: 2 }} /> Sign up
                            </IconButton>
                        </Grid>
                        <Grid item xs={6}
                            sx={{
                                marginTop: 8,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Typography variant="h6"
                                sx={{ mb: 2, color: "text.secondary" }}
                            >
                                Already a member?
                            </Typography>
                            <IconButton
                                variant="contained"
                                color="primary"
                                onClick={handleLogin}
                                sx={{ width: '300px', fontSize: '20px' }}
                            >
                                <LoginIcon sx={{ mr: 2 }} /> Log in
                            </IconButton>
                        </Grid>
                    </Grid>
                )}
            {currentUser.loggedIn && (
                <Grid container
                >
                    <Grid item xs={12}
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h6"
                            sx={{ mb: 2, color: "text.secondary" }}
                        >
                            Hi, {currentUser.details.firstname}! What events can we help you map today?
                        </Typography>
                        <IconButton
                            variant="contained"
                            color="primary"
                            onClick={handleDashboard}
                            sx={{ width: '300px', fontSize: '20px' }}
                        >
                            <DashboardIcon sx={{ mr: 2 }} /> Go to dashboard
                        </IconButton>
                    </Grid>
                </Grid>
            )}
        </Box>
    )
}

export default UserLinks