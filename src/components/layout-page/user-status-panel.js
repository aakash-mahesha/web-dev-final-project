import React from 'react';
import { Avatar, Typography, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

const UserStatusPanel = ({ user }) => {
    return (
        <div style={{ marginRight:"15px"}}>
        <Box display="flex" alignItems="center">
            <Avatar sx={{backgroundColor:'transparent'}} mr={0}>
                <AccountCircleOutlinedIcon fontSize='large' />
            </Avatar>
            <Box ml={1}>
                {user.loggedIn ? (
                    <>
                    <Typography variant="subtitle1">
                    {user.details.firstname} {user.details.lastname}
                    </Typography>
                    <Typography variant="body2" color="lightgrey">
                        {user.details.username}
                    </Typography>
                    </>
                ) : (
                    <Typography variant="subtitle1">
                        Hi Guest User
                    </Typography>
                )}
                
            </Box>
        </Box>
        </div>
        
    );
};

export default UserStatusPanel;