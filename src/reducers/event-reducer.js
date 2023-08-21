import { createSlice } from "@reduxjs/toolkit";
import {createEventThunk, deleteEventThunk, findEventThunk, updateEventThunk} from "../../services/tuits-thunks";
const currentUser = {
    "userName": "Amelia",


};
const initialState = {
    events: [],
    loading: false,
};
const eventsSlice = createSlice({
    name: "events",
    initialState,
    extraReducers: {
        [findEventThunk.pending]: (state) => {
            state.loading = true;
            state.events = []},

        [findEventThunk.fulfilled]:
            (state,{payload})=> {
            state.loading = false
                state.tuits = payload},
        // if request times out, or responds with error  reset loading flag
        // report error
        [findEventThunk.rejected]:
            (state,action)=>{
                state.loading = false
                state.error = action.error
        },
    
        [createEventThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false;
                //state.events.unshift(payload)
                state.events.push(payload);
            },
        [updateEventThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false;
                const eventNdx = state.events.findIndex((t) => t._id === payload._id)
                state.events[eventNdx] = { ...state.events[eventNdx], ...payload }
            }



    },
    reducers: {
        deleteEvent(state, action) {
            const index = state.events
                .findIndex(event =>
                    event._id === action.payload);
            state.events.splice(index, 1);
        },

    }
});
export const {deleteEvent} = eventsSlice.actions;
export default eventsSlice.reducer;