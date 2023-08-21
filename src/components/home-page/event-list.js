import React from 'react';
import dayjs from 'dayjs';
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import { dbDetailsThunk } from '../../thunks/event-details-thunks';


const EventList = ({ events }) => {
    // const { search } = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // console.log('search', search)
    const handleLoadEvent = async (id) => {
        try {
            await dispatch(dbDetailsThunk(id));
            navigate(`/details/${id}`);

        } catch (e) {
            alert(e);
        }
    };

    let listedEvents = '';
    console.log(events)

    if (events.length) {
        listedEvents = events.map((event) => (
        <ListItem key={event._id} disablePadding>
            <ListItemButton >
                <Grid container spacing={2} onClick={async () => await handleLoadEvent(event._id)}
                    sx={{ textAlign: "left", pl: 2, display: "flex", justifyContent: "flex-start" }}
                >
                    <Grid item xs={12}>
                        <Grid container
                            sx={{
                                py: 2
                            }}
                        >
                            <Grid item xs={2}
                                sx={{
                                    pr: 1
                                }}
                            >
                                <Typography>
                                    {dayjs(event.startDate).format('MMM D')}
                                </Typography>
                            </Grid>
                            <Grid item xs={7}
                                sx={{
                                    pr: 2
                                }}
                            >
                                <Typography variant='h6'>{event.eventName}</Typography>
                            </Grid>
                            <Grid item xs={3}>
                                {event.image && (<Box
                                    component="img"
                                    sx={{
                                        pr: 2,
                                        width: "100%",
                                    }}
                                    src={event.image} />)}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </ListItemButton>
        </ListItem>
    ))}

    return (
        <Box sx={{ display: 'flex' }}>
            <List>
                {listedEvents}
            </List>
        </Box>
    );
}

export default EventList