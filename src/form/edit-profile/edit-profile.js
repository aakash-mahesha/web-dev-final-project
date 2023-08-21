import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid,Typography } from '@mui/material';
import InterestTabBox from "../../components/register-component/interest-tab-box";

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { profileThunk, updateUserThunk, logoutThunk } from "../../thunks/auth-thunks";
import authReducer from "../../reducers/auth-reducer";
function ProfileForm() {
    const { currentUser } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState(currentUser.details);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedTags, setSelectedTags] = useState([]);
    // const [firstName, setFirstName] = useState(currentUser);
    // const [lastName, setLastName] = useState(currentUser);
    // const [email, setEmail] = useState(currentUser);
    // const [password, setPassword] = useState(currentUser);
    // const [confirmPassword, setConfirmPassword] = useState(currentUser);
    // const [address, setAddress] = useState(currentUser);
    // const [city, setCity] = useState(currentUser);
    // const [zipCode, setZipCode] = useState(currentUser);
    // const [state, setState] = useState(currentUser);
    // const [country, setCountry] = useState(currentUser);
    // const [shouldSubmit, setShouldSubmit] = useState(false);


    const handleFirstNameChange = (event) => {
        const newProfile = {
            ...profile, firstname: event.target.value,
        };
        setProfile(newProfile);
    };

    const handleLastNameChange = (event) => {
        const newProfile = {
            ...profile, lastname: event.target.value,
        };
        setProfile(newProfile);
    };

    const handleUsernameChange = (event) => {
        const newProfile = {
            ...profile, username: event.target.value,

        };
        setProfile(newProfile);
    };
    const handleEmailChange = (event) => {

        const newProfile = {
            ...profile, email: event.target.value,
        };
        setProfile(newProfile);
    };
    const handlePasswordChange = (event) => {
        const newProfile = {
            ...profile, password: event.target.value,
        };
        setProfile(newProfile);
    };
    // const handleConfirmPasswordChange = (event) => {
    //     const newProfile = {
    //         ...profile, confirmPassword: event.target.value,
    //     };
    //     setProfile(newProfile);
    // };
    const handleAddressChange = (event) => {
        const newProfile = {
            ...profile, address: event.target.value,
        };
        setProfile(newProfile);
    };
   
    const handleAddressLine1Change = (event) => {
      
        const newProfile = {
            ...profile,  address: { ...profile.address, addressLine1: event.target.value, }
        };
        setProfile(newProfile);
    };
    const handleAddressLine2Change = (event) => {
      
        const newProfile = {
            ...profile,  address: { ...profile.address, addressLine2: event.target.value, }
        };
        setProfile(newProfile);
    };

    const handleCityChange = (event) => {
        const newProfile = {
             ...profile,  address: { ...profile.address, city: event.target.value, }
        };
        setProfile(newProfile);
    };
  
    const handleStateChange = (event) => {
        const newProfile = {
            ...profile,  address: { ...profile.address, stateName: event.target.value, }
        };
        setProfile(newProfile);
    };
    const handleZipCodeChange = (event) => {
        const newProfile = {
            ...profile,  address: { ...profile.address, zipcode: event.target.value, }
        };
        setProfile(newProfile);
    };
    const handleCountryChange = (event) => {
        const newProfile = {
            ...profile,  address: { ...profile.address, country: event.target.value, }
        };
        setProfile(newProfile);
    };
    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     setShouldSubmit(true);
    // };
    const handleTagChange = (event, newTag) => {
        setSelectedTags(newTag)
      }
    const save = async () => {
        await dispatch(updateUserThunk(profile));
    };
   
    useEffect(() => {
        const loadProfile = async () => {

            try {
                const { payload } = await dispatch(profileThunk());
                setProfile(payload);

            } catch (error) {
                console.error(error);
                navigate("/login");
            }
        };

        loadProfile();
    }, []);
    console.log(profile)
    console.log(profile.address)
    return (
        <div>
            <form >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            autoFocus
                            required
                            value={profile.firstname}
                            onChange={handleFirstNameChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            autoFocus
                            required
                            value={profile.lastname}
                            onChange={handleLastNameChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            autoFocus
                            required
                            value={profile.username}
                            onChange={handleUsernameChange}
                        />

                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            fullWidth
                            autoFocus
                            required
                            value={profile.email}
                            onChange={handleEmailChange}
                        />

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            autoFocus
                            required
                            value={profile.password}
                            onChange={handlePasswordChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            autoFocus
                            required
                            value={profile.address.addressLine1}
                            onChange={handleAddressLine1Change}
                        />
                        
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            autoFocus
                            required
                            value={profile.address.addressLine2}
                            onChange={handleAddressLine2Change}
                        />
                        
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="City"
                            variant="outlined"
                            fullWidth
                            autoFocus
                            required
                            value={profile.address.city}
                            onChange={handleCityChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Zip Code"
                            variant="outlined"
                            fullWidth
                            autoFocus
                            required
                            value={profile.address.zipcode}
                            onChange={handleZipCodeChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="State"
                            variant="outlined"
                            fullWidth
                            autoFocus
                            required
                            value={profile.address.stateName}
                            onChange={handleStateChange}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Country"
                            variant="outlined"
                            fullWidth
                            autoFocus
                            required
                            value={profile.address.country}
                            onChange={handleCountryChange}
                        />
                    </Grid>

                </Grid>
                {/* <Grid item xs={12} sm={12} md={6}>

                    <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
                        Select the tags that interest you!
                    </Typography>
                    <Grid container>
                        <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                            <InterestTabBox interestTabsList={profile.tags} selectedTags={selectedTags} handleTagChange={handleTagChange} />
                        </Grid>
                    </Grid>
                </Grid> */}
                <Grid item xs={12} sm={6}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onChange={save}
                    >
                        Save
                    </Button>
                </Grid>


            </form>
        </div>










    );


}
export default ProfileForm;