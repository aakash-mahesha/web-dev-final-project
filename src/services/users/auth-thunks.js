import * as authService from "./auth-service";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerThunk = createAsyncThunk("auth/register", async ({ username, password }) => {
    const response = await authService.register({ username, password });
    return response.data;
}); 
export const loginThunk = createAsyncThunk("auth/login", async ({ username, password }) => {
    const response = await authService.login({ username, password });
    return response.data;
});
export const logoutThunk = createAsyncThunk("auth/logout", async () => {  
    await authService.logout();
});
export const profileThunk = createAsyncThunk("auth/profile", async () => {
    const response = await authService.profile();
    return response.data;
});
export const updateUserThunk = createAsyncThunk("auth/updateUser", async (user) => {
    const response = await authService.updateUser(user);
    return response.data;
});