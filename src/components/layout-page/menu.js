// based on temporary drawer from: https://mui.com/material-ui/react-drawer/

// (drawer has add event, login, logout, etc options)
import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


export default function SiteMenu() {

    const { currentUser } = useSelector(state => state.auth);
    // const [currentUser] = React.useState(true);
    const [drawerState, setDrawerState] = React.useState(false);

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerState(open);
    };

    const menuItems = ['Home', 'Search', 'Create an event', 'Dashboard', 'Logout', 'Login', 'Register'];
    const menuLinks = ['/', '/search', '/create-event', '/dashboard', '/', '/', '/'];
    const menuIcons = [<HomeIcon />, <SearchIcon />, <AddCircleIcon />, <DashboardIcon />, <LogoutIcon />, <LoginIcon />, <PersonAddIcon />]

    const menuList = menuItems.map((item, index) => {
        let show = true;
        if (currentUser.loggedIn) {
            if (item === 'Login' || item === 'Register') {
                show = false;
            }
        } else {
            if (item === 'Create an event' || item === 'Dashboard' || item === 'Logout') {
                show = false;
            }
        }

        return (
            show &&
            <ListItem key={index} disablePadding>
                <ListItemButton component={Link} to={menuLinks[index]}>
                    <ListItemIcon>
                        {menuIcons[index]}
                    </ListItemIcon>
                    <ListItemText primary={item} />
                </ListItemButton>
            </ListItem>
        );
    });

    return (
        <div>
            <IconButton
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={toggleDrawer(true)}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor='right'
                open={drawerState}
                onClose={toggleDrawer(false)}
            >
                <Box sx={{ display: 'flex' }}>
                    <List>
                        {menuList}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
}