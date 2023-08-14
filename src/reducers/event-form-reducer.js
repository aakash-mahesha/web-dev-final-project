import { createSlice } from "@reduxjs/toolkit";
import { submitEventFormThunk } from "../services/event-form-thunks";

const initialState = {
    loading: false,
    submittedForm: false,
    message: 'init'
}

const eventFormSlice = createSlice({
    name:"eventFormState",
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [submitEventFormThunk.pending]:
        (state) => {
            state.submittedForm = false;
            state.loading = true;
        },

        [submitEventFormThunk.fulfilled]:
        (state, {payload}) => {
            state.loading = false;
            const error = payload.includes("Request failed with status code 400");
            if(error) {
                state.submittedForm = false;
            }
            else {
                state.submittedForm = true;
            }
            state.message = payload;
            console.log("In fulfilled: ", state.loading, state.submittedForm, state.payload);
        },

        [submitEventFormThunk.rejected]:
        (state, {payload}) => {
            state.submittedForm = false;
            state.loading = false;
            state.message = payload;
        }
    }
})

export const { submitEventForm } = eventFormSlice.actions;
export default eventFormSlice.reducer