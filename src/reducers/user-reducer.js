import { createSlice } from "@reduxjs/toolkit";
import { findAllUsersThunk, findUserByIdThunk, createUserThunk, deleteUserThunk, updateUserThunk } from "../thunks/user-thunks";
    const initialState = {
        users: [],
        loading: false,
        error: null,
        currentUser: null,
    };

const usersSlice = createSlice({
    name: "user",
  initialState,
  reducers: {},
  extraReducers: {
    [findAllUsersThunk.pending]: (state, action) => {
        state.loading = true;
        state.users = [];
    },
    [findAllUsersThunk.fulfilled]: (state, {payload}) => {
        state.loading = false;
        state.users = payload;
      },
    [findAllUsersThunk.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error;
      },
    [findUserByIdThunk.pending]: (state, action) => {
        state.loading = true;
       
    },
    [findUserByIdThunk.fulfilled]: (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
      },
    [findUserByIdThunk.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.error;
      },
    [createUserThunk.fulfilled]: (state, action) => {
        state.users.push(action.payload);
      },
    [deleteUserThunk.fulfilled]: (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload._id);
      },
    [updateUserThunk.fulfilled]: (state, action) => {
        const index = state.users.findIndex((user) => user._id === action.payload._id);
        state.users[index] = action.payload;
      }
  },

});

export default usersSlice.reducer;



