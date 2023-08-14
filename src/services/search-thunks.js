import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchResults, submitSearch } from "./search-services.js";

export const submitSearchThunk = createAsyncThunk(
    "events/search",
    async (searchCrit) => {
        console.log(`search-form-thunks search: ${searchCrit}`);
        const response = await submitSearch(searchCrit);
        return response.data;
    }
);

export const resultsThunk = createAsyncThunk(
    "events/search/results",
    async () => {
        const response = await fetchResults();
        return response.data;
    }
)