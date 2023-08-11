import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import { Link } from 'react-router-dom';

import events from "../../map-page/map-items/events.json";

const SearchResults = () => {
    // update to pass event id to details link so that clicked event is the one that pops up

    return (
        <Box sx={{ display: 'flex' }}>
            <List>
                {events.map((event, index) => (
                    <ListItem key={event.title} disablePadding>
                        <ListItemButton component={Link} to='/details'>
                            <Grid container spacing={2}
                                sx={{ textAlign: "left", pl: 2, display: "flex", justifyContent: "flex-start" }}
                            >
                                <Grid item xs={12}>
                                    <Grid container
                                        sx={{
                                            py: 2
                                        }}
                                    >
                                        <Grid item xs={2}>
                                            {event.date.start_date}
                                        </Grid>
                                        <Grid item xs={7}>
                                            <Typography variant='h6'>{event.title}</Typography>
                                        </Grid>
                                        <Grid item xs={3}>
                                            <Box
                                                component="img"
                                                sx={{
                                                    pr: 2,
                                                    width: "100%",
                                                }}
                                                src={event.thumbnail} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default SearchResults