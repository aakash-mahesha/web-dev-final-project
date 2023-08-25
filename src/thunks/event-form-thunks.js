import { createAsyncThunk } from "@reduxjs/toolkit";
import { createEvent, deleteEvent, editEvent } from "../services/event-form-service.js";

export const createEventThunk = createAsyncThunk(
    "event/createEvent",
    async (formData) => {
        const response = await createEvent(formData);
        console.log(response);
        return response;
    }
);

export const editEventThunk = createAsyncThunk(
    "event/editEvent",
    async (formData) => {
        const response = await editEvent(formData);
        return response;
    }
)

export const deleteEventThunk = createAsyncThunk(
    "event/deleteEvent",
    async (formData) => {
        const response = await deleteEvent(formData)
        return response;
    }
)