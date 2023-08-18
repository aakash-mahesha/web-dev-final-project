import { current } from "@reduxjs/toolkit";
import React from "react";
import { useSelector } from "react-redux";

const LoginStateDisplay = ()=>{
    const current_user = useSelector((state) => state.auth.currentUser)
    return(
        <>
        {current_user.loggedIn?
        <div>
            <h1>User Logged in</h1>
            {current_user.details.username}<br/>
            {current_user.details.password}
        </div>
        
        : 
        <h1>User not logged in</h1>}
        
        </>

    );

}

export default LoginStateDisplay;