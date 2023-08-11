import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

const SearchResults = () => {
    const results = ['Inbox', 'Starred', 'Send email', 'Drafts'];

    return (
        <Box sx={{ display: 'flex' }}>
            <List>
                {results.map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton component={Link} to='/details'>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default SearchResults