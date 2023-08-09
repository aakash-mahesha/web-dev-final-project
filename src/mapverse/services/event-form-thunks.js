import { createAsyncThunk } from "@reduxjs/toolkit";
import { saveEventForm, submitEventForm } from "./event-form-service.js";

export const submitEventFormThunk = createAsyncThunk(
    "event/submitEventForm",
    async () => await submitEventForm() // point to upload service
);