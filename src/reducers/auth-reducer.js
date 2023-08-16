import { createSlice } from "@reduxjs/toolkit";
import {loginThunk, logoutThunk, profileThunk, registerThunk} from "../services/users/auth-thunks";
const initialState = {
    currentUser: null,
};
const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    // declaring a loginThunk to store the logged in user in the payload
    extraReducers:{
    
        [registerThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
         },

        [loginThunk.fulfilled]:(state,{payload}) => {
            //in a state variable called currentUser
            state.currentUser = payload;
        },
        [logoutThunk.fulfilled]: (state,action) => {
            state.currentUser = null;
        },
        [profileThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
    },
    });
export default authSlice.reducer;
