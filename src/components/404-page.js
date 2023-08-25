import { Typography, Box, IconButton } from "@mui/material"
import { useNavigate } from "react-router"

const FourOhFourPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    }

    return (
        <Box padding={5}>
            <Typography variant="h4">
                Oh no! A wild
            </Typography>
            <Typography variant="h1" color="secondary">
                404 Error
            </Typography>
            <Typography variant="h4">
                appeared! Looks like its time to 
                <IconButton onClick={handleGoHome}>
                go home
            </IconButton>
            </Typography>
        </Box>
    )
}

export default FourOhFourPage