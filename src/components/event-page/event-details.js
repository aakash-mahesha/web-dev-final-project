import React, { useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';

// update to reflect revised event structure from api and backend
// to know whether to format description, 
// check whether object (ie from api)
// (already formatted type (from db) should be string):
// https://www.w3docs.com/snippets/javascript/how-to-check-if-a-value-is-an-object-in-javascript.html

const EventDetails = ({
    event = {
        "name": "2021 Austin City Limits Music Festival",
        "date": {
            "start_date": "Oct 1",
            "when": "Oct 1 – 10"
        },
        "address": [
            "Zilker Park, 2207 Lou Neff Rd",
            "Austin, TX"
        ],
        "pos": ["39.742043", "-104.991531"],
        "url": "https://www.austintexas.org/event/austin-city-limits-music-festival/350781/",
        "description": "One of the country's largest celebrations of live music, this two weekend, six-day festival brings the magic of the famed public TV series \"Austin City Limits\" outside the studio and into Austin's...",
        "venue": {
            "name": "Zilker Park",
            "rating": 4.8,
            "reviews": 837,
            "url": "https://www.google.com/search?q=Zilker+Park&ludocid=11191514603003015866&ibp=gwp%3B0,7"
        },
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8mRlkCYd_eqWXP6BjfIHI8_m35omm6PkpHEYS9jFoq1wz3O4ra2i8mz4&s",
        "host": {
            "firstname": "Alice",
            "lastname": "Wonderland",
            "_id": "123"
        }
    }
}) => {
    // when calling, pass only selected event (via url) (update to take event arg w/o default)
    const [place, street] = event.address[0].split(',');
    const [bookmarked, setBookmarked] = useState(false);

    const handleBookmark = () => {
        setBookmarked(!bookmarked);
    }

    return (
        <div>
            <ListItem disablePadding>
                <ListItemButton component={Link} to='/search'>
                    <ArrowBackIcon />
                    <ListItemText primary="Back to results" />
                </ListItemButton>
            </ListItem>
            <Divider />
            <Grid container spacing={2}
                sx={{ textAlign: "left", pl: 2, display: "flex", justifyContent: "flex-start" }}
            >
                <Grid item xs={12}
                    sx={{ textAlign: "right", justifyContent: "flex-end" }} >
                    <IconButton color="primary" aria-label="add to bookmarks"
                        onClick={handleBookmark}>
                        {bookmarked ? <BookmarkOutlinedIcon /> : <BookmarkBorderOutlinedIcon />}
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Grid container
                        sx={{
                            py: 2
                        }}
                    >
                        <Grid item xs={9}>
                            <Typography variant='h5'>{event.name}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Box
                                component="img"
                                sx={{
                                    pr: 2,
                                    width: "100%",
                                }}
                                src={event.image} />
                        </Grid>
                    </Grid>
                </Grid>
                <Divider style={{ width: '100%' }} />
                <Grid item xs={12}>
                    <Typography variant='h5'>
                        Details
                    </Typography>
                    <Grid item xs={12}>
                        <Grid container
                            sx={{
                                pt: 2
                            }}
                        >
                            <Grid item xs={1}>
                                <AccessTimeIcon />
                            </Grid>
                            <Grid item xs={11}>{event.date.when}</Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container
                        sx={{
                            pb: 2
                        }}
                    >
                        <Grid item xs={1}>
                            <LocationOnIcon />
                        </Grid>
                        <Grid item xs={11}>
                            <Grid item xs={12} sx={{ fontWeight: 'bold' }}>
                                {place}
                            </Grid>
                            <Grid item xs={12}>{street}, {event.address[1]}</Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Typography>
                        {event.description}
                    </Typography>
                    <a target='_blank' rel='noopener noreferrer' href={event.url}>
                        <Typography>Read more on event site</Typography>
                    </a>
                </Grid>
                <Grid item xs={12}
                    sx={{
                        py: 2
                    }}
                >
                    <Typography variant='h6'>
                        Host
                    </Typography>
                    <Typography>
                        {event.host.firstname} {event.host.lastname}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default EventDetails