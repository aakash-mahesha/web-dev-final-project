import { createAsyncThunk } from "@reduxjs/toolkit";
import { submitEventForm } from "./event-form-service.js";

export const submitEventFormThunk = createAsyncThunk(
    "event/submitEventForm",
    async (formData) => {
        const response = await submitEventForm(formData);
        return response;
    }
);