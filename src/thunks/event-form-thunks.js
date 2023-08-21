import { createAsyncThunk } from "@reduxjs/toolkit";
import { createEvent } from "../services/event-form-service.js";

export const createEventThunk = createAsyncThunk(
    "event/createEvent",
    async (formData) => {
        const response = await createEvent(formData);
        return response;
    }
);

export const editEventThunk = createAsyncThunk(
    "event/editEvent",
    async (formData) => {
        const response = 0;
        return response;
    }
)

export const deleteEventThunk = createAsyncThunk(
    "event/deleteEvent",
    async (formData) => {
        const response = 0;
        return response;
    }
)