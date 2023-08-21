import { createSlice } from "@reduxjs/toolkit";
import {deleteEventThunk, findEventThunk, updateEventThunk} from "../../services/tuits-thunks";
const currentUser = {
    "userName": "Amelia",


};
const templateEvent = {
    ...currentUser,
    "createdEventIds": [123,234,345],
    "goingEventIds":  [11,12,13],
    "likedEventIds": [1,2,3],
    "user_type": "regular",
    
}
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
    
      
        [updateEventThunk.fulfilled]:
            (state, { payload }) => {
                state.loading = false;
                const eventNdx = state.events.findIndex((t) => t._id === payload._id)
                state.events[eventNdx] = { ...state.events[eventNdx], ...payload }
            }



    },
    reducers: {
       

    }
});
export const {deleteEvent} = eventsSlice.actions;
export default eventsSlice.reducer;