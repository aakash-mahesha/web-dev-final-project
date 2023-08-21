import { Typography, Box, Container, Button} from "@mui/material";
import MainLayout from "../layout/main-layout";
import TGrid from "../grid";
import Header from "../header";
import EventCard from "../card/eventCard";
import { useNavigate } from "react-router";
import EditEventCard from "../card/editEventCard";
import TabsComponent from "../tab/tab";
import { Router, Route, BrowserRouter, Switch, Link } from "react-router-dom";

const Events = () => {
    const navigate = useNavigate();
   
    const handleClick = () => { navigate('/create-event')
        
    }
    
    return(
        <>
        
        <Box>
            <MainLayout/>

        </Box>
        <Container xs={8} lg={10}>
        <Box>
            <Header subtitle ="Hosting Event"/>
            <Box m={1}
                
                display="flex"
                justifyContent="flex-end"
                alignItems="flex-end">
            <Button  color="primary" onClick={handleClick}>Create Event</Button> 
            </Box>
            <TabsComponent/>

        </Box>
        </Container>
        </>
    )
}
export default Events;