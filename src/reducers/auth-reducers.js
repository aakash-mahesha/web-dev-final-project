import { createSlice, current } from "@reduxjs/toolkit";
import { loginThunk } from "../thunks/auth-thunks";

const initialState = {
    currentUser : {loggedIn: false},
}

const authSlice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers:{
        // loginSubmit(state,action){
        //     state.email= action.payload.email;
        //     state.password = action.payload.password;
        //     state.logged_in = true;
        //     console.log(current(state)) 
        // }
    },
    extraReducers:{
        [loginThunk.fulfilled]:(state,{payload})=>{
            state.currentUser =  {...state.currentUser};
            state.currentUser.details = payload;
            state.currentUser.loggedIn = true;
        }
    }
});

export default authSlice.reducer