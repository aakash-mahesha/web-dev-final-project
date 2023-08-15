import { createAsyncThunk } from "@reduxjs/toolkit";
import { submitProfileForm } from "./profile-form-service";
export const submitProfileFormThunk = createAsyncThunk(
    "user/submitProfileForm",
    async (formData) => {
        console.log( formData);
        await submitProfileForm(formData);
    } 
)
export default submitProfileFormThunk;