import { Box, Skeleton, Typography } from "@mui/material";

import LayoutPage from "../components/layout-page";
import Dashboard from "../components/dashboard"
import React, { useState } from "react";
import { Grid, useMediaQuery,Paper} from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from"./header";

import Sidebar from "./sidebar";
import EventTable from "./eventTable";
import TGrid from "./grid";
import Navtab from "./navtab";

import EventCard from "./eventCard";



const UserHome = () => {
    
    const Homecontent = () => {
        const isNonMobile = useMediaQuery("(min-width: 600px)");
        const [isSidebarOpen, setIsSidebarOpen] = useState(true);
        //const userId = useSelector((state) => state.global.userId);
        //const { data } = useGetUserQuery(userId);
      
        return (
          <Box display={isNonMobile ? "flex" : "block"} width="100%" height="100%">
            <Sidebar
              //user={data || {}}
              isNonMobile={isNonMobile}
              drawerWidth="250px"
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            <Box flexGrow={1}>
            <Navtab
              user= "admin"
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
            
            <Header/>
            <Header title="hi"/>
           
            <Paper>
            
              <Header subtitle ="Your upcomming event"/>
              
            
            </Paper>
      
            
            
            <div style={{ padding: '20px' }}>
            <EventCard/>
            
            
            <Paper >
              <TGrid display ="flex"/>
            </Paper>
            </div>
            </Box>
            </Box>
      );
        }
      

    return (
        <LayoutPage Content={Homecontent} />
        // <LayoutPage Content={pageContent} Icon={icon}/>
    );
}
export default UserHome;