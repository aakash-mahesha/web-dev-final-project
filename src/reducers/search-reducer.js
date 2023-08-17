import { createSlice } from "@reduxjs/toolkit";
import { apiSearchThunk, dbSearchThunk, launchSearchThunk } from "../services/search-thunks";

const initialState = {
    results: [],
    loading: false
}

const searchSlice = createSlice({
    name: 'results',
    initialState,
    extraReducers: {
        // [launchSearchThunk.pending]:
        //     (state) => {
        //         state.loading = true
        //         state.results = []
        //     },
        // [launchSearchThunk.fulfilled]:
        //     (state, { payload }) => {
        //         console.log('fulfilled', payload)
        //         state.loading = false
        //         state.results = payload
        //     },
        // [launchSearchThunk.rejected]:
        //     (state, action) => {
        //         state.loading = false
        //         state.error = action.error
        //     },
        [apiSearchThunk.pending]:
            (state) => {
                console.log('pending')
                state.loading = true
            },
        [apiSearchThunk.fulfilled]:
            (state, { payload }) => {
                console.log('fulfilled', payload)
                state.loading = false
                state.results = payload
            },
        [apiSearchThunk.rejected]:
            (state, action) => {
                console.log('rejected')
                state.loading = false
                state.error = action.error
                console.log(state.error)
            },
        // [dbSearchThunk.pending]:
        //     (state) => {
        //         state.loading = true
        //     },
        // [dbSearchThunk.fulfilled]:
        //     (state, { payload }) => {
        //         console.log('fulfilled', payload)
        //         state.loading = false
        //         state.results = state.results.concat(payload)
        //     },
        // [dbSearchThunk.rejected]:
        //     (state, action) => {
        //         state.loading = false
        //         state.error = action.error
        //     },
    }
});

export default searchSlice.reducer