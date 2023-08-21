import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "../services/event-details-service"

export const apiDetailsThunk = createAsyncThunk(
    'details/api',
    async (id) => {
        const response = await service.apiDetails(id);
        console.log('api thunk response', response)
        return response;
    }
);

export const dbDetailsThunk = createAsyncThunk(
    'details/db',
    async (id) => {
        const response = await service.dbDetails(id);
        console.log('db thunk response', response)
        return response;
    }
);