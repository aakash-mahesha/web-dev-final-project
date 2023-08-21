import { createAsyncThunk } from "@reduxjs/toolkit";
import * as service from "../services/tags-service"

export const dbGetTagsThunk = createAsyncThunk(
    'tags/db',
    async () => {
        const results = await service.dbGetTags()
        return results
    }
)