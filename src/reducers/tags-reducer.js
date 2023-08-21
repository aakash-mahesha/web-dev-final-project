import { createSlice } from "@reduxjs/toolkit";
import { dbGetTagsThunk } from "../services/tags-thunks";

const initialState = {
    tagOptions: [],
    loading: false,
}

const tagsSlice = createSlice({
    name: 'tagOptions',
    initialState,
    extraReducers: {
        [dbGetTagsThunk.pending]:
            (state) => {
                console.log('pending')
                state.loading = true
            },
        [dbGetTagsThunk.fulfilled]:
            (state, { payload }) => {
                console.log('fulfilled', payload)
                state.loading = false
                state.tagOptions = payload
            },
        [dbGetTagsThunk.rejected]:
            (state, action) => {
                console.log('rejected')
                state.loading = false
                state.error = action.error
                console.log(state.error)
            },
    }
});

export default tagsSlice.reducer