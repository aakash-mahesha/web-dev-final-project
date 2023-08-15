// code based on "Persistent Drawer" template provided by MUI: https://mui.com/material-ui/react-drawer/
// drawer nesting functionality based on Alkesh Desai's answer to https://stackoverflow.com/questions/63087007/nested-drawer-in-material-ui-reactjs

import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import LayoutPage from '../layout-page';
import Map from "./map-items/search-map";
import DrawerHeader from "./header";
import Main from "./main";

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

    const searchIcon = () => {
        return (
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ mr: 2, ...(open && { display: 'none' }) }}
            >
                <SearchIcon />
            </IconButton>
        );
    }

    const mapContent = () => {
        return (
            <>
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
            </>
        );
    }


    return (
        <LayoutPage Content={mapContent} Icon={searchIcon} />
    );
}

export default MapPage