import React from 'react';
import dayjs from 'dayjs';
import { Link, useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';

// import events from "../../map-page/map-items/events.json";

// const SearchResults = ({results}) => {
const SearchResults = ({ results, loading }) => {
    const { search } = useLocation();

    console.log('search',search)

    const resultsList = results.map((event) => (
        <ListItem key={event._id} disablePadding>
            <ListItemButton component={Link} to={`/results/${event._id}`}>
                <Grid container spacing={2}
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
                </Grid>
            </ListItemButton>
        </ListItem>
    ))

    const noResults = (
        <ListItem>
            No matches for given search. Please search again.
        </ListItem>
    )

    return (
        <Box sx={{ display: 'flex' }}>
            <List>
                {
                    loading &&
                    <ListItem>
                        Loading...
                    </ListItem>
                }
                {results.length ? resultsList : noResults
                    // results.map((event) => (
                    //     <ListItem key={event._id} disablePadding>
                    //         <ListItemButton component={Link} to='/details/:id'>
                    //             <Grid container spacing={2}
                    //                 sx={{ textAlign: "left", pl: 2, display: "flex", justifyContent: "flex-start" }}
                    //             >
                    //                 <Grid item xs={12}>
                    //                     <Grid container
                    //                         sx={{
                    //                             py: 2
                    //                         }}
                    //                     >
                    //                         <Grid item xs={2}>
                    //                             {dayjs(event.dates[0]).format('D MMM')}
                    //                         </Grid>
                    //                         <Grid item xs={7}>
                    //                             <Typography variant='h6'>{event.name}</Typography>
                    //                         </Grid>
                    //                         <Grid item xs={3}>
                    //                             <Box
                    //                                 component="img"
                    //                                 sx={{
                    //                                     pr: 2,
                    //                                     width: "100%",
                    //                                 }}
                    //                                 src={event.image.url} />
                    //                         </Grid>
                    //                     </Grid>
                    //                 </Grid>
                    //             </Grid>
                    //         </ListItemButton>
                    //     </ListItem>
                    // ))
                }
            </List>
        </Box>
    );
}

export default SearchResults