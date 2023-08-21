import { createAsyncThunk } from "@reduxjs/toolkit";
<<<<<<< HEAD:src/services/event-form-thunks.js
import { createEvent } from "./event-form-service.js";
=======
import { submitEventForm } from "../services/event-form-service.js";
>>>>>>> cbebefb786a94c2ee9511b9db63a0b635f3b50c0:src/thunks/event-form-thunks.js

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