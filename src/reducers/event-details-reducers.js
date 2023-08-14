import { createSlice } from "@reduxjs/toolkit";
import { detailsThunk } from "../services/event-details-thunks";

const detailsSlice = createSlice({
    name: 'details',
    initialState: { currentEvent: null },
    reducers: {},
    extraReducers: {
        [detailsThunk.fulfilled]: (state, { payload }) => {
            state.currentEvent = payload;
        },
    },
});

export default detailsSlice.reducer