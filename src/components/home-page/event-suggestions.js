import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Grid from '@mui/material/Grid';
import Box from "@mui/material/Box";

import { findAllUsersThunk } from "../../thunks/user-thunks";
import SearchResults from "../search-page/search-box/search-results";

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
            const lastElement = fieldList[field.length - 1];
            endsList.push(lastElement);
        });

        return endsList;
    }

    useEffect(() => {
        async function loadEvents() {
            const { payload } = await dispatch(findAllUsersThunk);
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
                sx={{ textAlign: "left", pl: 2, display: "flex", justifyContent: "flex-start" }}
            >
                <Grid item xs={6}>
                    <SearchResults
                        results={tenLikedEvents}
                        loading={false}
                        noResults={false}
                        origin={'db'} />
                </Grid>
                <Grid item xs={6}>
                    <SearchResults
                        results={tenGoingEvents}
                        loading={false}
                        noResults={false}
                        origin={'db'} />
                </Grid>
            </Grid>
        </Box>
    );
}

export default EventSuggestions