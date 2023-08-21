import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router";
import { profileThunk,updateUserThunk,logoutThunk } from "../../thunks/auth-thunks";
import authReducer from "../../reducers/auth-reducer";
function ProfileScreen() {
    const { currentUser } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState(currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const save = async () => {
        await dispatch(updateUserThunk(profile));
    };
    useEffect(() => {
        const loadProfile = async () => {
          
            try {
                const { payload } =  await dispatch(profileThunk());
                setProfile(payload);
                
            } catch (error) {
                console.error(error);
                navigate("/login");
            }
        };
    
        loadProfile();
    }, []);
    console.log(profile)

    return (
        <div>
            <h1>Profile Screen</h1>
            {profile && (<div>
                    <div>
                        <label>First Name</label>
                        <input type="text" value={profile.firstname}
                               onChange={(event) => {
                                   const newProfile = {
                                       ...profile, firstname: event.target.value,
                                   };
                                   setProfile(newProfile);
                               }}/>
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input type="text" value={profile.lastname}
                               onChange={(event) => {
                                   const newProfile = {
                                       ...profile, lastname: event.target.value,
                                   };
                                   setProfile(newProfile);
                               }}/>
                    </div>
                    
                </div>
                
            )}
            <button
                onClick={() => {
                    dispatch(logoutThunk());
                    navigate("/login");
                }}> Logout
            </button>
            <button onClick={save}>Save</button>
        </div>);
}


export default ProfileScreen;