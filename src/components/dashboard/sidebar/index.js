import React from "react";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Search from "@mui/icons-material/Search";
import DashboardIcon from '@mui/icons-material/Dashboard';
import  AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChecklistIcon from '@mui/icons-material/Checklist';
import FavoriteIcon from '@mui/icons-material/Favorite';
import HomeIcon from '@mui/icons-material/Home';
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FlexBetween from "../flex-between";
import {
    SettingsOutlined,
    ChevronLeft,
    ChevronRightOutlined,
    HomeOutlined,
    

  } from "@mui/icons-material";
  //import profileImage from "../../../assets/profile1.jpeg";
 ;
 
  
const navItems = [
  {
    text: "Home",
    icon: <HomeIcon/>,
  },
  {
    text: "MyEvents",
    icon: <ChecklistIcon />,
  },
  
   
    {
      text: "Profile",
      icon: <AccountCircleIcon/>,
    },
    {
      text: "Admin",
      icon: <DashboardIcon/>,
    },
    
  ];
 
  const Sidebar = ({
    user,
    drawerWidth,
    isSidebarOpen,
    setIsSidebarOpen,
    isNonMobile,
  }) => {
    const { pathname } = useLocation();
    const [active, setActive] = useState("");
    const navigate = useNavigate();
    const theme = useTheme();
  
    useEffect(() => {
      setActive(pathname.substring(1));
    }, [pathname]);
  
    return (
      <Box component="nav" >
        {isSidebarOpen && (
          <Drawer 
            open={isSidebarOpen}
            onClose={() => setIsSidebarOpen(false)}
            variant="persistent"
            anchor="left"
            sx={{
              width: drawerWidth,
              "& .MuiDrawer-paper": {
                color: theme.palette.secondary[200],
                backgroundColor: theme.palette.background.alt,
                boxSixing: "border-box",
                borderWidth: isNonMobile ? 0 : "2px",
                width: drawerWidth,
              },
            }}
          >
            <Box width="100%">
              <Box m="1.5rem 2rem 2rem 3rem">
                <FlexBetween color={theme.palette.info.light}>
                  <Box display="flex" alignItems="center" gap="0.5rem">
                    
                  </Box>
                  {!isNonMobile && (
                    <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                      <ChevronLeft />
                    </IconButton>
                  )}
                </FlexBetween>
              </Box>
              <List>
                {navItems.map(({ text, icon }) => {
                  if (!icon) {
                    return (
                      <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                        {text}
                      </Typography>
                    );
                  }
                  const lcText = text.toLowerCase();
  
                  return (
                    <ListItem key={text} disablePadding sx={{ display: 'block' }}>
                      <ListItemButton
                        onClick={() => {
                          console.log({lcText})
                          navigate(`/dashboard/${lcText}`);
                          setActive(lcText);
                        }}
                        sx={{
                          minHeight: 48,
                          justifyContent: isSidebarOpen ? 'initial' : 'center',
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: isSidebarOpen ? 3 : 'auto',
                            justifyContent: 'center',
                          
                          }}
                        >
                          {icon}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: isSidebarOpen ? 1 : 0 }} />
                        {active === lcText && (
                          <ChevronRightOutlined sx={{ ml: "auto" }} />
                        )}
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>
            </Box>
  
            <Box position="absolute" bottom="2rem">
              <Divider />
              <FlexBetween textTransform="none" gap="1rem" m="1.5rem 2rem 0 3rem">
                {/* <Box
                  component="img"
                  alt="profile"
                  src={profileImage}
                  height="40px"
                  width="40px"
                  borderRadius="50%"
                  sx={{ objectFit: "cover" }}
                /> */}
                <Box textAlign="left">
                  <Typography
                    fontWeight="bold"
                    fontSize="0.9rem"
                    sx={{ color: theme.palette.secondary[100] }}
                  >
                    {/* {user.name}   */}
                  </Typography>
                  <Typography
                    fontSize="0.8rem"
                    sx={{ color: theme.palette.secondary[200] }}
                  >
                  
                  </Typography>
                </Box>
                <SettingsOutlined
                  sx={{
                    color: theme.palette.secondary[300],
                    fontSize: "25px ",
                  }}
                />
              </FlexBetween>
            </Box>
          </Drawer>
        )}
      </Box>
    );
  };
  
  export default Sidebar;