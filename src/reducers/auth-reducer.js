import { createSlice } from "@reduxjs/toolkit";
<<<<<<< HEAD
import {loginThunk, logoutThunk, profileThunk, registerThunk, updateUserThunk} from "../thunks/auth-thunks";
=======
import {loginThunk, logoutThunk, profileThunk, registerThunk} from "../thunks/auth-thunks";
import { current } from "@reduxjs/toolkit";

>>>>>>> 5f19b7f75fc47e55a8e91cf93967458070bb6d6c
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
        [profileThunk.fulfilled]: (state, { payload }) => {
            state.currentUser.details = payload;
            state.currentUser.loggedIn = true;
        },
        [profileThunk.rejected]: (state, { payload }) => {
            state.currentUser.details = null;
            state.currentUser.loggedIn = false;
        },
       
        [profileThunk.pending]: (state, action) => {
            state.currentUser.details = null;
            state.currentUser.loggedIn = false;
        },
        
        [updateUserThunk.fulfilled]: (state, { payload }) => {
            state.currentUser.details = payload;
            state.currentUser.loggedIn = true;
        },
        
    },
    });
export default authSlice.reducer;
