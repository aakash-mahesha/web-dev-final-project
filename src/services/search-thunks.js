import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "./search-service"

// export const launchSearchThunk = createAsyncThunk(
//     'search',
//     async (query) => {
//         const results = await service.fullSearch(query)
//         console.log('thunk results', results)
//         return results
//     }
// );

export const apiSearchThunk = createAsyncThunk(
    'search/api',
    async (query) => {
        const results = await service.apiSearch(query)
        console.log('api thunk results', results)
        return results
    }
);

// export const dbSearchThunk = createAsyncThunk(
//     'search/db',
//     async (query) => {
//         const results = await service.dbSearch(query)
//         console.log('db thunk results', results)
//         return results
//     }
// );