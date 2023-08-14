import { createSlice } from "@reduxjs/toolkit";
import { resultsThunk, submitSearchThunk } from "../services/search-thunks";

const initialState = {
    loading: false,
    submittedSearch: false,
    resultsState: null,
}

const searchSlice = createSlice({
    name: "searchState",
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [submitSearchThunk.pending]:
            (state) => {
                state.submittedSearch = false;
                state.loading = true;
                state.resultsState = null;
            },

        [submitSearchThunk.fulfilled]:
            (state, { payload }) => {
                state.submittedSearch = true;
                state.loading = false;
                state.resultsState = payload;
            },

        [submitSearchThunk.rejected]:
            (state) => {
                state.submittedSearch = false;
                state.loading = false;
                state.resultsState = null;
            },
        [resultsThunk.pending]:
            (state) => {
                state.loading = true;
                state.resultsState = null;
            },

        [resultsThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false;
                state.resultsState = payload;
            },

        [resultsThunk.rejected]:
            (state) => {
                state.loading = false;
                state.resultsState = null;
            },
    },
});

export const { submitSearch } = searchSlice.actions
export default searchSlice.reducer