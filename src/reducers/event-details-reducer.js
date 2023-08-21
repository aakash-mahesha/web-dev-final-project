import { createSlice } from "@reduxjs/toolkit";
import { apiDetailsThunk, dbDetailsThunk, } from "../thunks/event-details-thunks";

const initialState = {
    eventDetails: '',
    loading: false,
}

const eventDetailsSlice = createSlice({
    name: 'eventDetails',
    initialState,
    extraReducers: {
        [apiDetailsThunk.pending]:
            (state) => {
                console.log('pending')
                state.loading = true
                state.eventDetails = ''
            },
        [apiDetailsThunk.fulfilled]:
            (state, { payload }) => {
                console.log('fulfilled', payload)
                state.loading = false
                state.eventDetails = payload
            },
        [apiDetailsThunk.rejected]:
            (state, action) => {
                console.log('rejected')
                state.loading = false
                state.error = action.error
                console.log(state.error)
            },
        [dbDetailsThunk.pending]:
            (state) => {
                console.log('pending')
                state.loading = true
                state.eventDetails = ''
            },
        [dbDetailsThunk.fulfilled]:
            (state, { payload }) => {
                console.log('fulfilled', payload)
                state.loading = false
                state.eventDetails = payload
            },
        [dbDetailsThunk.rejected]:
            (state, action) => {
                console.log('rejected')
                state.loading = false
                state.error = action.error
                console.log(state.error)
            },
    }
});

export default eventDetailsSlice.reducer