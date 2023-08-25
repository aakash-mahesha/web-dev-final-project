import * as authService from "../services/auth-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerThunk = createAsyncThunk("auth/register", async (regFormData) => {
    const response = await authService.register(regFormData);
    return response;
}); 
export const loginThunk = createAsyncThunk("auth/login", async ({ username, password }) => {
<<<<<<< HEAD
    console.log('in auth thunks',{username, password})
=======
>>>>>>> 5f19b7f75fc47e55a8e91cf93967458070bb6d6c
    const response = await authService.login({ username, password });
    return response;
});
export const logoutThunk = createAsyncThunk("auth/logout", async () => { 
    await authService.logout();
});
export const profileThunk = createAsyncThunk(
    "auth/profile", async () => {
        const response = await authService.profile();
        console.log('response profile thunk')
        console.log(response.data)
        return response.data;
    });

export const updateUserThunk = createAsyncThunk("auth/updateUser", async (user) => {
    const response = await authService.updateUser(user);
    return response.data;
});