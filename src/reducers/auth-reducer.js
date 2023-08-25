import { createSlice } from "@reduxjs/toolkit";
import {loginThunk, logoutThunk, profileThunk, registerThunk} from "../thunks/auth-thunks";
import { current } from "@reduxjs/toolkit";

const initialState = {
    currentUser : {details: null, loggedIn: false},
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    // declaring a loginThunk to store the logged in user in the payload
    extraReducers:{
    
        [registerThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload
        },

        [loginThunk.fulfilled]:(state,{payload}) => {
            state.currentUser = payload;
        },
        [logoutThunk.fulfilled]: (state) => {
            state.currentUser = initialState
        },
        [profileThunk.fulfilled]: (state, { payload }) => {
            state.currentUser = payload;
        },
        [profileThunk.rejected]: (state, { payload }) => {
            state.currentUser = initialState;
        },
        [profileThunk.pending]: (state,action) => {
            state.currentUser = state.currentUser
        },
        
    },
    });
export default authSlice.reducer;
