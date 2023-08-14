import { createAsyncThunk } from "@reduxjs/toolkit";
import { details } from "./event-details-services";

export const detailsThunk = createAsyncThunk(
    "events/details",
    async (eid) => {
        const response = await details(eid);
        return response;
    }
);