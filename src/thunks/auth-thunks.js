import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../services/auth-services";


export const loginThunk = createAsyncThunk(
    "user/loging" , async (credentials) => {
        const user = await authService.login(credentials);

        return user;
    }
)
