import * as userService from "../services/user-service";
import { createAsyncThunk } from "@reduxjs/toolkit";
export const findAllUsersThunk = createAsyncThunk("users/findAllUsers", async () => {
    const users = await userService.findAllUsers();
    return users;
});
export const findUserByIdThunk = createAsyncThunk("users/findUserById", async (id) => {
    const response = await userService.findUserById(id);
    return response.data;
});
export const createUserThunk = createAsyncThunk("users/createUser", async (user) => {
    const response = await userService.createUser(user);
    return response.data;
});

export const deleteUserThunk = createAsyncThunk("users/deleteUser", async (id) => {
    const response = await userService.deleteUser(id);
    return response.data;
});
export const updateUserThunk = createAsyncThunk("users/updateUser", async (user) => {
    const response = await userService.updateUser(user);
    return response.data;
});
