import React from 'react';
import { Avatar, Typography, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

const UserStatusPanel = ({ user }) => {
    return (
        <Box display="flex" alignItems="center">
            <Avatar>
                <PersonIcon />
            </Avatar>
            <Box ml={2}>
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
    );
};

export default UserStatusPanel;