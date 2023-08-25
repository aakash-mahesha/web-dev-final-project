import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";

import { findAllUsersThunk } from "../../thunks/user-thunks";
import EventList from "./event-list";
import { Typography } from "@mui/material";

const EventSuggestions = () => {
    const { currentUser } = useSelector(state => state.auth);

    const organizerUser = (currentUser.loggedIn ? currentUser.details.user_type === "organization" : false);

    const [tenLikedEvents, setTenLikedEvents] = useState([]);
    const [tenGoingEvents, setTenGoingEvents] = useState([]);
    const [tenCreatedEvents, setTenCreatedEvents] = useState([]);

    const dispatch = useDispatch();

    function arrTenOrLess(arr) {
        console.log("event sugg", arr);
        if (!arr) {
            return [];
        }
        return (arr.length > 10 ? arr.slice(10) : arr);
    }

    const findEndFieldList = (userList, field) => {
        const endsList = [];
        userList.map((user) => {
            const fieldList = user[field];
            if (fieldList) {
                const lastElement = fieldList[field.length - 1];
                if (lastElement) {
                    endsList.push(lastElement);
                }
            }
        });

        return endsList;
    }

    useEffect(() => {
        async function loadEvents() {
            if (currentUser.loggedIn) {
                console.log(organizerUser)
                if (organizerUser) {
                    console.log(currentUser.details.createdEventIds)
                    const eventIdsAsObject = currentUser.details.createdEventIds.map((id) => ({ event_id: id, source: "db" }));
                    setTenCreatedEvents(arrTenOrLess(eventIdsAsObject));
                } else {
                    setTenLikedEvents(arrTenOrLess(currentUser.details.likedEventIds));
                    setTenGoingEvents(arrTenOrLess(currentUser.details.goingEventIds));
                }
            } else {
                const { payload } = await dispatch(findAllUsersThunk());
                console.log(payload)
                if (payload) {
                    const tenUsersList = arrTenOrLess(payload);
                    setTenLikedEvents(findEndFieldList(tenUsersList, "likedEventIds"));
                    setTenGoingEvents(findEndFieldList(tenUsersList, "goingEventIds"));
                }
            }
        };
        if (organizerUser) {
            if (!tenCreatedEvents.length) {
                loadEvents();
            }

        } else {
            if (!tenGoingEvents.length || !tenLikedEvents.length) {
                loadEvents();
            }
        }
    }, []);

    // likedEvents and goingEvents (as lists in side-by-side grids)

    return (
        <Box>
            {organizerUser ?
                (<Grid container spacing={2}
                    sx={{ alignContent: "center", textAlign: "center", p: 10 }}
                >
                    <Grid item xs={12}
                        sx={{ textAlign: "center", alignContent: "center", justifyContent: "center" }}
                    >
                        <Typography variant="h6"
                            sx={{ color: "text.secondary" }}
                        >
                            You recently created
                        </Typography>
                        {console.log('created events', tenCreatedEvents)}
                        <EventList eventIds={tenCreatedEvents} />
                    </Grid>
                </Grid>)
                : (<Grid container spacing={2}
                    sx={{ textAlign: "center", p: 10 }}
                >
                    <Grid item xs={6}>
                        <Typography variant="h6"
                            sx={{ color: "text.secondary" }}
                        >
                            {currentUser.loggedIn ?
                                "You recently liked" : "Users recently liked"
                            }
                        </Typography>
                        {console.log('like events', tenLikedEvents)}
                        <EventList eventIds={tenLikedEvents} />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h6"
                            sx={{ color: "text.secondary" }}
                        >
                            {currentUser.loggedIn ?
                                "You are going to" : "Users are going to"
                            }
                        </Typography>
                        <EventList eventIds={tenGoingEvents} />
                    </Grid>
                </Grid>)
            }
        </Box>
    );
}

export default EventSuggestions