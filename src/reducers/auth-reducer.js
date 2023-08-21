import { createSlice } from "@reduxjs/toolkit";
import {loginThunk, logoutThunk, profileThunk, registerThunk, updateUserThunk} from "../thunks/auth-thunks";
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
            
            state.currentUser.details = payload;
            state.currentUser.loggedIn = true;
        },

        [loginThunk.fulfilled]:(state,{payload}) => {
            //in a state variable called currentUser
            // console.log('in auth reducer', payload)
            state.currentUser.details = payload;
            state.currentUser.loggedIn = true;
        },
        [logoutThunk.fulfilled]: (state,action) => {
            state.currentUser.details = null;
            state.currentUser.loggedIn = false;
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
