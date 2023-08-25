import { createSlice } from "@reduxjs/toolkit";
import { createEventThunk, deleteEventThunk, editEventThunk } from "../thunks/event-form-thunks.js";

const initialState = {
    loading: false,
    submittedForm: false,
    message: 'init',
    processedFormUpdates: false,
}

const eventFormSlice = createSlice({
    name:"eventFormState",
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [createEventThunk.pending]:
        (state) => {
            state.submittedForm = false;
            state.loading = true;
        },

        [createEventThunk.fulfilled]:
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
        },

        [createEventThunk.rejected]:
        (state, {payload}) => {
            state.submittedForm = false;
            state.loading = false;
            state.message = payload;
        },

        [editEventThunk.pending]:
        (state) => {
            state.processedFormUpdates = false;
            state.loading = true;
        },

        [editEventThunk.fulfilled]:
        (state) => {
            state.loading = false;
            state.processedFormUpdates = true;
        },

        [editEventThunk.rejected]:
        (state) => {
            state.processedFormUpdates = false;
            state.loading = false;
        },

        [deleteEventThunk.pending]:
        (state) => {
            state.processedFormUpdates = false;
            state.loading = true;
        },

        [deleteEventThunk.fulfilled]:
        (state, {payload}) => {
            state.loading = false;
            const error = payload.includes("Request failed with status code 400");
            if(error) {
                state.processedFormUpdates = false;
            }
            else {
                state.processedFormUpdates = true;
            }
            state.message = payload;
        },

        [deleteEventThunk.rejected]:
        (state, {payload}) => {
            state.processedFormUpdates = false;
            state.loading = false;
            state.message = payload;
        },
    }
})

export const { submitEventForm } = eventFormSlice.actions;
export default eventFormSlice.reducer