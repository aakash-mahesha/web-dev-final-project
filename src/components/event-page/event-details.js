import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { apiDetailsThunk, dbDetailsThunk } from '../../thunks/event-details-thunks';
// import { updateUserThunk } from '../../thunks/user-thunks';
import { updateUser } from '../../utils/update-user-events';

// update to reflect revised event structure from api and backend
// to know whether to format description, 
// check whether object (ie from api)
// (already formatted type (from db) should be string):
// https://www.w3docs.com/snippets/javascript/how-to-check-if-a-value-is-an-object-in-javascript.html

const EventDetails = () => {
    const { eventDetails } = useSelector(state => state.eventDetails);
    const { currentUser } = useSelector(state => state.auth);
    const [event, setEvent] = useState(eventDetails);

    const { origin, id } = useParams();
    console.log('params', useParams())
    console.log('id', id);
    const dispatch = useDispatch();
    console.log('from reducer', eventDetails);

    // async function loadEvent(origin, id) {
    //     if (origin === 'db') {
    //         const { payload } = await dispatch(dbDetailsThunk(id));
    //         return payload;

    //     } else {
    //         const { payload } = await dispatch(apiDetailsThunk(id));
    //         return payload;
    //     }
    // };

    useEffect(() => {
        async function loadEvent() {
            if (origin === 'db') {
                const { payload } = await dispatch(dbDetailsThunk(id));
                setEvent(payload);

            }
            if (origin === 'api') {
                const { payload } = await dispatch(apiDetailsThunk(id));
                setEvent(payload);
                console.log('effect')
            }
        };
        if (event === '') {
            loadEvent();
        }
    }, []);
    // console.log('reducer',eventDetails)
    console.log('state', event)

    // const removeEventId = (arr, eid) => arr.filter((idObj) => idObj.event_id !== eid);

    const updateUserFieldList = async (fieldName, add) => {
        // let fieldList = currentUser.details[fieldName];
        // if (add) {
        //     const idObj = { event_id: id, source: origin };
        //     fieldList.push(idObj);
        // } else {
        //     fieldList = removeEventId(fieldList, id);
        // }
        // const user = {
        //     // ...currentUser,
        //     fieldName: fieldList
        // }
        // updateUserThunk(user);
        const idObj = { event_id: id, source: origin };
        const operation = (add ? "ADD" : "REMOVE");
        await updateUser(dispatch, currentUser, fieldName, operation, idObj);

    }

    // update to get initial value from state
    const [liked, setLiked] = useState(false);

    // update to send new value to server via reducer
    const handleLiked = () => {
        setLiked(!liked);
        updateUserFieldList("likedEventIds", liked);
    }


    // update to get initial value from state
    const [going, setGoing] = useState(false);

    // update to send new value to server via reducer
    const handleGoing = () => {
        setGoing(!going);
        updateUserFieldList("goingEventIds", going);
    }

    const getUserVals = () => {
        if (currentUser.loggedIn) {
            // check whether event id is in current users liked list
            const initialLiked = currentUser.details.likedEventIds.some((idObj) => idObj.event_id === id);
            setLiked(initialLiked);

            // check whether event id is in current users going list
            const initialGoing = currentUser.details.goingEventIds.some((idObj) => idObj.event_id === id);
            setGoing(initialGoing)
        }
    }

    useEffect(() => getUserVals(), []);

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1);
    }

    const getCityStateCountry = (event) => {
        const address = event.address;
        const cityStateCountry = [address.city, address.state, address.country].filter((x) => x).join(', ');
        return cityStateCountry;
    }

    const description = (event) => {
        const description = event.description;
        if (origin === 'db') {
            return (
                <Grid item xs={12}>
                    <Typography>{description}</Typography>
                </Grid>
            );
        } else {
            return (
                <Grid item xs={12}
                    sx={{ p: 2 }}
                >
                    <Grid container>
                        {description.info &&
                            <Grid item xs={12}>
                                <Typography>
                                    {description.info}
                                </Typography>
                            </Grid>}
                        {description.eventType.length ?
                            (<Grid item xs={12}>
                                <Typography
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    Event Type:
                                </Typography>
                                <Typography>
                                    {description.eventType.join(', ')}
                                </Typography>
                            </Grid>) : ''}
                        {description.featured.length ?
                            (<Grid item xs={12}>
                                <Typography
                                    sx={{ fontWeight: 'bold' }}
                                >
                                    Featured:
                                </Typography>
                                <Typography>
                                    {description.featured.join(', ')}
                                </Typography>
                            </Grid>) : ''}
                    </Grid>
                </Grid>
            )
        }
    }

    return (
        <div>
            {event && (<div>
                <ListItem disablePadding>
                    <ListItemButton onClick={handleBackClick}>
                        <ArrowBackIcon />
                        <ListItemText primary="Back" />
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
                        {currentUser.loggedIn && (<IconButton color="primary" aria-label="add to bookmarks"
                            onClick={handleLiked}>
                            {liked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                        </IconButton>)}
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
                            {event.image && (<Grid item xs={3}>
                                <Box
                                    component="img"
                                    sx={{
                                        pr: 2,
                                        width: "100%",
                                    }}
                                    src={event.image} />
                            </Grid>)}
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
                                    {dayjs(event.startDate).format('D MMM YYYY h:mm A')}
                                    {event.endDate && event.endDate !== event.startDate ?
                                        ` - ${dayjs(event.endDate).format('D MMM YYYY h:mm A')}` : ''}
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
                                    {event.address.venueName}
                                </Grid>
                                <Grid item xs={12}>{event.address.street}</Grid>
                                <Grid item xs={12}>{getCityStateCountry(event)} {event.address.zipcode}</Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    {description(event)}
                    {(origin === 'api') &&
                        (<Grid item xs={12} >
                            {/* <Typography>
                            {event.description}
                        </Typography> */}
                            {/* <a target='_blank' rel='noopener noreferrer' href={event.url}> */}
                            <Typography >
                                <a target='_blank' rel='noopener noreferrer' href={event.url}>See on Ticketmaster</a>
                            </Typography>
                            {/* </a> */}
                        </Grid>)}
                    {event.hostDetails && (<Grid item xs={12}
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
                    </Grid>)}
                    {currentUser.loggedIn && (<Grid item xs={12}
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
                    </Grid>)}
                </Grid>
            </div>)}
        </div>
    )
}

export default EventDetails