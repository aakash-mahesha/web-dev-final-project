import React from "react";
import { useSelector } from "react-redux";

const LoginStateDisplay = ()=>{
    const {email, password, logged_in} = useSelector((state) => state.auth)
    return(
        <>
        <h1>{email}</h1>
        <h1>{password}</h1>
        {logged_in ? 
            <h1>ture</h1>
        :
            <h1>false</h1>
        }
        </>

    );

}

export default LoginStateDisplay;