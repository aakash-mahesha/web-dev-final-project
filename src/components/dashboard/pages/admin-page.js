import { Typography, Box, Container, Button, Divider,Grid} from "@mui/material";
import MainLayout from "../layout/main-layout";
import Header from "../header";
import { useNavigate } from "react-router";
import { Router, Route, BrowserRouter, Switch, Link } from "react-router-dom";
import UserTable from "../user-table/user-table";
import EventTable from "../event-table/event-table";

const Admin= () => {
    const navigate = useNavigate();
   
    
    
    
    return(
        <>
        
        <Box>
            <MainLayout/>

        </Box>
        <Container item xs={8} lg={10} >
        <Box>
            <Grid Container justify="center"> 
                <Header subtitle ="Users Management"/> 
                </Grid>
            <UserTable/>
            <Divider/>
            <Grid Container justify="center"> 
                <Header subtitle ="Event Management"/> 
                </Grid>
            <EventTable/>

        </Box>
            
        </Container>
        </>
    );
}
export default Admin;