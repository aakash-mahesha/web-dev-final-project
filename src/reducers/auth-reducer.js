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
            console.log(payload);
            state.currentUser.details = payload;
            state.currentUser.loggedIn = true;
            console.log(current(state));
        },

        [loginThunk.fulfilled]:(state,{payload}) => {
            //in a state variable called currentUser
            console.log('in auth reducer', payload)
            state.currentUser.details = payload;
            state.currentUser.loggedIn = true;
            console.log(current(state));
        },
        [logoutThunk.fulfilled]: (state,action) => {
            state.currentUser.details = null;
            state.currentUser.loggedIn = false;
        },
        
    },
    });
export default authSlice.reducer;
