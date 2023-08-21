// code based on "Persistent Drawer" template provided by MUI: https://mui.com/material-ui/react-drawer/

import * as React from 'react';

import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';

import SiteMenu from './menu';


function LayoutPage({ Content, Icon }) {
    const includeIcon = Boolean(Icon);
    // const { drawerWidth } = useSelector(state => state.drawerWidth);
    const drawerWidth = 400;

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    {includeIcon && <Icon />}
                    <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
                        MapVerse
                    </Typography>
                    <SiteMenu />
                </Toolbar>
            </AppBar>
            <Content />
        </Box>
    );
}

export default LayoutPage