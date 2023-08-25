import React, { useState } from "react";
import { useNavigate } from "react-router";  // to navigate to profile after login

import { useDispatch } from "react-redux";  // to invoke thunks

import { loginThunk } from "../thunks/auth-thunks" // to send login HTTP request to server
function LoginScreen(){
    const[username, setUsername] = useState("");
    const [password,setPassword]=useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleLogin = async ()=>{
        try{
            await  dispatch(loginThunk({username, password}));
            console.log({username, password});
            navigate("/");
            
        }catch (e){
            alert(e);
        }
    };
    return(
        <div>
            <h1>Login</h1>
            <div className="mt-2">
                <label>Username</label>
                <input className="form-control" type="text" value={username}
                       onChange={(event) => setUsername(event.target.value)}/>
            </div>
            <div className="mt-2">
                <label>Password</label>
                <input className="form-control" type="password" value={password}
                       onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <button className="btn btn-primary mt-2"
                    onClick={handleLogin}>
                Login
            </button>
        </div>

    );
}
export default LoginScreen;