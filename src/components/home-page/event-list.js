import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useNavigate } from "react-router";
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

import { apiDetailsThunk, dbDetailsThunk } from '../../thunks/event-details-thunks';


const EventList = ({ eventIds }) => {
    console.log('event list', eventIds)
    const dispatch = useDispatch();
    // iterate over eventId list, for each event, retrieve event from either db or api
    const fetchEvents = async (eventIds) => {
        const events = [];
        for (const idObject of eventIds) {
            if (idObject.source === 'db') {
                const { payload } = await dispatch(dbDetailsThunk(idObject.event_id));
                if (payload) {
                    events.push(payload);
                    console.log('fetcher', events)
                }
            } else {
                const { payload } = await dispatch(apiDetailsThunk(idObject.event_id));
                if (payload) {
                    events.push(payload);
                }
            }
        }
        console.log('fetcher events', events)
        return events;
    }

    // const [events, setEvents] = useState([]);

    const navigate = useNavigate();

    const handleLoadEvent = (id) => {
        try {
            // await dispatch(dbDetailsThunk(id));
            navigate(`/details/${id}`);

        } catch (e) {
            alert(e);
        }
    };

    const [events, setEvents] = useState([]);

    useEffect(() => {
        async function loadEvents() {
            if (Array.isArray(eventIds)) {
                console.log('checking length')
                if (!events.length) {
                    const fetchedEvents = await fetchEvents(eventIds);
                    console.log('fetchedEvents', fetchedEvents)
                    setEvents(fetchedEvents);
                }
            }
        };
        loadEvents();
    }, [eventIds]);

    console.log('effect events', events)

    const displayEvents = (events) => {
        // if (!Array.isArray(eventIds)) {
        //     return;
        // }
        // const events = await fetchEvents(eventIds);
        // setEvents(fetchEvents);

        if (events.length) {
            const listedEvents = events.map((event) => (
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
            ))
            return listedEvents
        }
        return '';
    }

    // useEffect(() => { displayEvents(eventIds) }, []);


    return (
        <Box sx={{ display: 'flex' }}>
            <List>
                {displayEvents(events)}
            </List>
        </Box>
    );
}

export default EventList