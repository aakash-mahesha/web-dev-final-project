// code based on "Persistent Drawer" template provided by MUI: https://mui.com/material-ui/react-drawer/
// drawer nesting functionality based on Alkesh Desai's answer to https://stackoverflow.com/questions/63087007/nested-drawer-in-material-ui-reactjs

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import Map from "./map-items/search-map";
import DrawerHeader from "./header";
import Main from "./main";
import AppBar from "./app-bar";

// export const drawerWidth = 400;
// export const drawerWidth = `calc(100% - 300px)`;
// export const drawerWidth = "40%"
export const drawerWidth = Number(getComputedStyle(document.documentElement)
    .getPropertyValue('--drawer-width'));

function MapPage({ Component }) {
    console.log(drawerWidth)
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <SearchIcon />
                    </IconButton>
                    <Typography variant="h5" noWrap component="div">
                        MapVerse
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <Component />
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Map />
            </Main>
        </Box>
    );
}

export default MapPage