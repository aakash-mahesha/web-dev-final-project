import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import dayjs from "dayjs";


import { IconButton, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

// update to reflect revised event structure from api and backend
// to know whether to format description, 
// check whether object (ie from api)
// (already formatted type (from db) should be string):
// https://www.w3docs.com/snippets/javascript/how-to-check-if-a-value-is-an-object-in-javascript.html

const ResultDetails = (
    //{
    // event = {
    //     "name": "2021 Austin City Limits Music Festival",
    //     "date": {
    //         "start_date": "Oct 1",
    //         "when": "Oct 1 – 10"
    //     },
    //     "address": [
    //         "Zilker Park, 2207 Lou Neff Rd",
    //         "Austin, TX"
    //     ],
    //     "pos": ["39.742043", "-104.991531"],
    //     "url": "https://www.austintexas.org/event/austin-city-limits-music-festival/350781/",
    //     "description": "One of the country's largest celebrations of live music, this two weekend, six-day festival brings the magic of the famed public TV series \"Austin City Limits\" outside the studio and into Austin's...",
    //     "venue": {
    //         "name": "Zilker Park",
    //         "rating": 4.8,
    //         "reviews": 837,
    //         "url": "https://www.google.com/search?q=Zilker+Park&ludocid=11191514603003015866&ibp=gwp%3B0,7"
    //     },
    //     "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8mRlkCYd_eqWXP6BjfIHI8_m35omm6PkpHEYS9jFoq1wz3O4ra2i8mz4&s",
    //     "host": {
    //         "firstname": "Alice",
    //         "lastname": "Wonderland",
    //         "_id": "123"
    //     }
    // }
    //}
) => {
    const navigate = useNavigate();
    const { id } = useParams();
    console.log('params', useParams())
    console.log('id', id);
    const { results } = useSelector(state => state.results);
    console.log('details results', results)
    const event = results.find((event) => event._id === id);
    console.log('event', event)
    // const currEvent = results.find((event) => event._id === id);
    // const [event, setEvent] = useState(currEvent);
    // console.log('event', event)
    // when calling, pass only selected event (via url) (update to take event arg w/o default)
    // const [place, street] = event.address[0].split(',');

    // update to get initial value from state
    const [liked, setLiked] = useState(false);

    // update to send new value to server via reducer
    const handleLiked = () => {
        setLiked(!liked);
    }

    // update to get initial value from state
    const [going, setGoing] = useState(false);

    // update to send new value to server via reducer
    const handleGoing = () => {
        setGoing(!going);
    }

    const handleBackClick = () => {
        navigate(-1);
    }

    const address = event.address;
    const cityStateCountry = [address.city, address.state, address.country].filter((x) => x).join(', ');

    // might need to take url as arg to preserve url params

    return (
        <div>
            <ListItem disablePadding>
                <ListItemButton onClick={handleBackClick}>
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
                    {/* <IconButton color="primary" aria-label="add to bookmarks"
                        onClick={handleGoing}>
                        {going ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
                    </IconButton> */}
                    <IconButton color="primary" aria-label="add to bookmarks"
                        onClick={handleLiked}>
                        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton>
                </Grid>
                <Grid item xs={12}>
                    <Grid container
                        sx={{
                            py: 2
                        }}
                    >
                        <Grid item xs={9}>
                            <Typography variant='h5'>{event.eventName}</Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Box
                                component="img"
                                sx={{
                                    pr: 2,
                                    width: "100%",
                                }}
                                src={event.image.url} />
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
                            {/* Start here */}
                            <Grid item xs={11}>
                                {dayjs(event.startDate).format('D MMM YYYY H:mm')}
                                {event.endDate && (- dayjs(event.endDate).format('D MMM YYYY H:mm'))}
                            </Grid>
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
                                {address.venueName}
                            </Grid>
                            <Grid item xs={12}>{address.street}</Grid>
                            <Grid item xs={12}>{cityStateCountry} {address.zipcode}</Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} >
                    {/* <Typography>
                        {event.description}
                    </Typography> */}
                    {/* <a target='_blank' rel='noopener noreferrer' href={event.url}> */}
                    <Typography component={Link} to={`/details/${event._id}`}>
                        See event details
                    </Typography>
                    {/* </a> */}
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
                        {event.hostDetails.name}
                    </Typography>
                    <Typography>
                        {event.hostDetails.email}
                    </Typography>
                </Grid>
                <Grid item xs={12}
                    sx={{ textAlign: "left", justifyContent: "flex-start" }} >
                    {/* <IconButton color="primary" aria-label="like"
                        onClick={handleLiked}>
                        {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                    </IconButton> */}
                    <IconButton color="primary" aria-label="going"
                        onClick={handleGoing}>
                        {going ? <CheckCircleIcon sx={{ mr: 1 }} /> : <CheckCircleOutlineIcon sx={{ mr: 1 }} />}
                        <Typography>Going?</Typography>
                    </IconButton>
                </Grid>
            </Grid>
        </div>
    )
}

export default ResultDetails