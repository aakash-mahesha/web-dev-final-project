import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authService from "../services/auth-services";


export const loginThunk = createAsyncThunk(
    "user/loging" , async (credentials) => {
        console.log('in loginThunk before calling api')
        console.log('credentials', credentials)
        const user = await authService.login(credentials);
        console.log('in loginThunk after calling api')
        console.log(user);
        return user;
    }
)
