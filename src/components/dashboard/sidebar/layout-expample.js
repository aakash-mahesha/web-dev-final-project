import * as React from 'react';

import MiniDrawer from './nav-item';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useLocation, useNavigate } from 'react-router-dom';
import Toolbar from '@mui/material/Toolbar';
import { styled } from '@mui/material/styles';
import AppBar from '../../layout-page/app-bar';
import SiteMenu from '../../layout-page/menu';
import { IconButton, Menu } from '@mui/material';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
const LayoutExample = () => {
    const [open, setOpen] = React.useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };
    return (

<Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                <IconButton>OO</IconButton>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{
                        marginRight: 5,
                        ...(open && { display: 'none' }),
                    }}
                >
                     <MenuIcon /> 
                 </IconButton>
                    <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        MapVerse
                    </Typography>
                    <SiteMenu />
                </Toolbar>
            </AppBar>
            <MiniDrawer />
            
        </Box>
    )
}
export default LayoutExample;
