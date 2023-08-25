import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography } from '@mui/material';
import InterestTabBox from "../../components/register-component/interest-tab-box";

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { profileThunk, updateUserThunk, logoutThunk } from "../../thunks/auth-thunks";
import authReducer from "../../reducers/auth-reducer";
import { current } from '@reduxjs/toolkit';
import { PanToolAltRounded } from '@mui/icons-material'
function ProfileForm() {
    const { currentUser } = useSelector((state) => state.auth);
    const [profile, setProfile] = useState(currentUser.details);
    const [userUpdated, setUserUpdated] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedTags, setSelectedTags] = useState([]);
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [stateName, setStateName] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [country, setCountry] = useState('');
    const [orgId, setOrgId] = useState('');
    const [orgName, setOrgName] = useState('');

    const setAllStates = () => {
        setFirstname(currentUser.details.firstname)
        setLastname(currentUser.details.lastname)
        setUsername(currentUser.details.username)
        setPassword(currentUser.details.password)
        setEmail(currentUser.details.email)
        setAddressLine1(currentUser.details.address.addressLine1)
        setAddressLine2(currentUser.details.address.addressLine2)
        setCity(currentUser.details.address.city)
        setStateName(currentUser.details.address.stateName)
        setZipcode(currentUser.details.address.zipcode)
        setCountry(currentUser.details.address.country)
        if(currentUser.details.user_type === "organization"){
            setOrgId(currentUser.details.orgData.orgId)
            setOrgName(currentUser.details.orgData.orgName)
        } 
    }

    const handleAddressLine1Change = (event) => {
        const newAddressLine1 = event.target.value;

        setAddressLine1(newAddressLine1);
    };

    const handleFirstNameChange = (event) => {
        const newFirstname = event.target.value;
        setFirstname(newFirstname);
    };

    const handleLastNameChange = (event) => {
        const newLastname = event.target.value;
        setLastname(newLastname);
    };
    const handleUsernameChange = (event) => {
        const newUsername = event.target.value;
        setUsername(newUsername);
    };
    const handleEmailChange = (event) => {
        const newEmail = event.target.value;
        setEmail(newEmail);
    };
    const handlePasswordChange = (event) => {
        const newPassword = event.target.value;
        setPassword(newPassword);
    };
    const handleAddressLine2Change = (event) => {
        const newAddressLine2 = event.target.value;
        setAddressLine2(newAddressLine2);
    };
    const handleCityChange = (event) => {
        const newCity = event.target.value;
        setCity(newCity);
    };
    const handleStateChange = (event) => {
        const newStateName = event.target.value;
        setStateName(newStateName);
    };
    const handleZipCodeChange = (event) => {
        const newZipcode = event.target.value;
        setZipcode(newZipcode);
    };
    const handleCountryChange = (event) => {
        const newCountry = event.target.value;
        setCountry(newCountry);
    }
    const handleOrgIdChange = (event) => {
        const newOrgId = event.target.value;
        setOrgId(newOrgId)
    }
    const handleOrgNameChange = (event) => {
        const newOrgName = event.target.value;
        setOrgName(newOrgName)
    }


    const handleTagChange = (event, newTag) => {
        setSelectedTags(newTag)
    }

    const save = async () => {
        
        let dummyUser = {
           ...currentUser.details,
           username:username,
           firstname:firstname, 
           lastname:lastname,
           password:password,
           address: {
            addressLine1:addressLine1,
            addressLine2:addressLine2,
            city: city,
            stateName : stateName,
            zipcode: zipcode,
            country: country, 
           },
           tags: selectedTags
        }

        if(currentUser.details.user_type === "organization"){
            dummyUser = {...dummyUser, orgData:{
                orgName: orgName,
                orgId : orgId,
            }}
        }

        await dispatch(updateUserThunk(dummyUser));

   
        await dispatch(profileThunk());

        
    };

    useEffect(() => {
        
        setAllStates()
        const loadProfile = async () => {

            const {payload} = await dispatch(profileThunk());
            if(payload.loggedIn){
                setProfile(payload)
            }
            else{
                console.error(payload);
                navigate("/login");
            }
        };

        loadProfile();
    }, []);

    return (
        <div>
            <Typography component="h4" variant="h4" sx={{ textAlign: 'left', mb: 2 }}>
                Welcome {currentUser.details.firstname} {currentUser.details.lastname}!
            </Typography>
            <form >
                <Typography component="h5" variant="h5" sx={{ mb: 2 }} color="primary">
                    Profile Information
                </Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            autoFocus
                            required
                            value={firstname}
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
                            value={lastname}
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
                            value={username}
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
                            value={email}
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
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </Grid>
                    {currentUser.details.orgData &&
                    <>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Organization Id"
                            variant="outlined"
                            fullWidth
                            autoFocus
                            required
                            value={orgId}
                            onChange={handleOrgIdChange}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Organization Name"
                            variant="outlined"
                            fullWidth
                            autoFocus
                            required
                            value={orgName}
                            onChange={handleOrgNameChange}
                        />
                    </Grid>
                    </>
                    }

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Address"
                            variant="outlined"
                            fullWidth
                            autoFocus
                            required
                            value={addressLine1}
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
                            value={addressLine2}
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
                            value={city}
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
                            value={zipcode}
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
                            value={stateName}
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
                            value={country}
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
                        variant="contained"
                        onClick={save}
                    >
                        Save

                    </Button>
                </Grid>


            </form>
        </div>
            










    );
}


export default ProfileForm;