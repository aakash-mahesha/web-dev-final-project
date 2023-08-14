import React, { useState } from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from"./header";

import Sidebar from "./sidebar";
import EventTable from "./eventTable";
import TGrid from "./grid";
import Navtab from "./navtab";

const Layout = () => {
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
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard"/> 
        <Navtab
          user= "admin"
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <div style={{ padding: '20px' }}>
        
          <TGrid display ="flex"/>
            
        </div>
        </Box>
        </Box>
  );
};
export default Layout;