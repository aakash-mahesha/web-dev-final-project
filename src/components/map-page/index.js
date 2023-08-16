// code based on "Persistent Drawer" template provided by MUI: https://mui.com/material-ui/react-drawer/
// drawer nesting functionality based on Alkesh Desai's answer to https://stackoverflow.com/questions/63087007/nested-drawer-in-material-ui-reactjs

import * as React from 'react';
import { useDispatch } from 'react-redux';

import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import LayoutPage from '../layout-page';
import Map from "./map-items/search-map";

function MapPage({ Component }) {
    // const { drawerWidth } = useSelector(state => state.drawerWidth);

    const [drawerWidth, setDrawerWidth] = React.useState(400);
    const [mainSide, setMainSide] = React.useState(true);

    // const calcDrawerWidth = () => {
    //     const windowWidth = window.innerWidth;
    //     console.log(windowWidth)
    //     if (windowWidth > 700) {
    //         return 400;
    //     } else {
    //         return windowWidth;
    //     }
    // };

    // const dispatch = useDispatch();
    const windowResizeHandler = () => {
        // const calculatedWidth = calcDrawerWidth();
        // setDrawerWidth(calculatedWidth);
        // console.log(calculatedWidth)
        const windowWidth = window.innerWidth;
        console.log(windowWidth)
        if (windowWidth > 700) {
            setDrawerWidth(400);
            setMainSide(true);
        } else {
            setDrawerWidth(windowWidth);
            setMainSide(false);
        }
    }

    try {
        window.addEventListener("resize", windowResizeHandler);
    } catch (error) {
        console.log(error)
    }

    // console.log(drawerWidth)

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

    const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }));

    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            flexGrow: 1,
            padding: theme.spacing(3),
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: `-${drawerWidth}px`,
            ...(open && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0,
                // width: '100%',
            }),
        }),
    );

    const showMain = (mainSide || !open);
    console.log(showMain)

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
                {showMain && <Main open={open}>
                    <DrawerHeader />
                    <Map />
                </Main>}
            </>
        );
    }


    return (
        <LayoutPage Content={mapContent} Icon={searchIcon} />
    );
}

export default MapPage