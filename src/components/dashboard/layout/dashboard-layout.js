import React, { useState } from "react";
import { Box, Grid, useMediaQuery,Paper} from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from"../header";
import Sidebar from "../sidebar";
import Navtab from "../navtab";


const DashLayout = () => {
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
      
      <Header/>
      <Header />
      
      <div style={{ padding: '20px' }}>

      <Header/>
      
      <Navtab
        user= "admin"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      
      
      </div>
      </Box>
      </Box>
);
};
export default DashLayout;

