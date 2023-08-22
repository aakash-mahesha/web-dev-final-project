import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";

import { findAllUsersThunk } from "../../thunks/user-thunks";
import EventList from "./event-list";
import { Typography } from "@mui/material";

const EventSuggestions = () => {
    const { currentUser } = useSelector(state => state.auth);

    const [tenLikedEvents, setTenLikedEvents] = useState([]);
    const [tenGoingEvents, setTenGoingEvents] = useState([]);

    const dispatch = useDispatch();

    const arrTenOrLess = (arr) => (arr.length > 10 ? arr.slice(10) : arr);

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
            const { payload } = await dispatch(findAllUsersThunk());
            console.log(payload)
            if (payload) {
                const tenUsersList = arrTenOrLess(payload);
                setTenLikedEvents(findEndFieldList(tenUsersList, "likedEventIds"));
                setTenGoingEvents(findEndFieldList(tenUsersList, "goingEventIds"));
            }
        };
        loadEvents();
    }, []);

    if (currentUser.loggedIn) {
        setTenLikedEvents(arrTenOrLess(currentUser.likedEventIds));
        setTenGoingEvents(arrTenOrLess(currentUser.goingEventIds));
    }

    // likedEvents and goingEvents (as lists in side-by-side grids)

    return (
        <Box>
            <Grid container spacing={2}
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
                    <EventList events={tenLikedEvents} />
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
            </Grid>
        </Box>
    );
}

export default EventSuggestions