// code based on "Persistent Drawer" template provided by MUI: https://mui.com/material-ui/react-drawer/

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import AppBar from "./app-bar";
import SiteMenu from './menu';


function LayoutPage({ Content, Icon }) {
    const includeIcon = Boolean(Icon);

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