import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
    email:' ',
    password:' ',
    logged_in: false
}

const authSlice = createSlice({
    name:"auth",
    initialState: initialState,
    reducers:{
        loginSubmit(state,action){
            state.email= action.payload.email;
            state.password = action.payload.password;
            state.logged_in = true;
            console.log(current(state)) 
        }
    }
});

export const {loginSubmit} = authSlice.actions
export default authSlice.reducer