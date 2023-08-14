import { createSlice } from "@reduxjs/toolkit";
import { submitProfileForm } from "../services/event-form-thunks";
export const initialState = {
    
    submitProfileForm: false};
const ProfileFormSlice = createSlice({
    name: "profileFormState",
    initialState: initialState, 
    reducers: {},
    extraReducers: {
        [submitProfileForm.pending]: (state) => {
            state.submitProfileForm = false;
        },
        [submitProfileForm.fulfilled]: (state) => {
            state.submitProfileForm = true;
        },
        [submitProfileForm.rejected]: (state) => {
            state.submitProfileForm = false;
        }
    }
})
export const { submitProfileForm } = ProfileFormSlice.actions;