import { createAsyncThunk } from "@reduxjs/toolkit";
import * as eventService from "../services/event-service.js";
export const findEventThunk = createAsyncThunk(
    "event/findEvent",
    async () => await eventService.findEvents()
);
export const deleteEventThunk = createAsyncThunk(
    "event/deleteEvent",
    async (eventId) => await eventService.deleteEvent(eventId)
);
export const updateEventThunk = createAsyncThunk(
    "event/updateEvent",
    async (event) => await eventService.updateEvent(event)
);
