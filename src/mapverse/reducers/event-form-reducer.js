import { createSlice } from "@reduxjs/toolkit";
import { saveEventFormThunk, submitEventFormThunk } from "../services/event-form-thunks";

const initialState = {
    loading: false,
    submittedForm: null,
    savedDraft: null
}

const eventFormSlice = createSlice({
    name:"eventFormState",
    initialState: initialState,
    reducers: {},
    extraReducers: {
        [submitEventFormThunk.pending]:
        (state) => {
            state.submittedForm = false;
            state.savedDraft = false;
            state.loading = true;
        },

        [submitEventFormThunk.fulfilled]:
        (state) => {
            state.submittedForm = true;
            state.savedDraft = false;
            state.loading = false;
        },

        [submitEventFormThunk.rejected]:
        (state) => {
            state.submittedForm = false;
            state.savedDraft = true; // NOT TOO SURE
            state.loading = false;
        }

        // [saveEventFormThunk.pending]:
        // (state) => {
        //     state.submittedForm = false;
        //     state.savedDraft = false;
        //     state.loading = true;
        // },

        // [saveEventFormThunk.fulfilled]:
        // (state) => {
        //     state.submittedForm = false;
        //     state.savedDraft = true;
        //     state.loading = false;
        // },

        // [saveEventFormThunk.rejected]:
        // (state) => {
        //     state.submittedForm = false;
        //     state.savedDraft = false; // NOT TOO SURE
        //     state.loading = false;
        // }
    }
})

export const { submitEventForm, saveEventForm } = eventFormSlice.actions;
export default eventFormSlice.reducer