import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid} from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import submitProfileFormThunk from '../../thunks/profile-form-thunks';
function ProfileContent(){
    const dispatch = useDispatch();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [shouldSubmit, setShouldSubmit] = useState(false);
    const user ={firstName:"Lee", lastName:"Lee", email:"lii@gmail.com",
    password:"123",confirmPassword:"123",address:"123 main street",city:"San Jose",zipCode:"95123",
    state:"CA",country:"USA"}
    //const user = useSelector((state) => state.global.user);
    useEffect(() => {
        if (user) {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        
        setEmail(user.email);
        setAddress(user.address);
        setCity(user.city);
        setZipCode(user.zipCode);
        setState(user.state);
        setCountry(user.country);
        }
    }, [user]);
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };
    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };
   
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
    };
    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };
    const handleCityChange = (event) => {
        setCity(event.target.value);
    };
    const handleZipCodeChange = (event) => {
        setZipCode(event.target.value);
    };
    const handleStateChange = (event) => {
        setState(event.target.value);
    };
    const handleCountryChange = (event) => {
        setCountry(event.target.value);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        setShouldSubmit(true);
    };
    useEffect(() => {
        if (shouldSubmit) {
        dispatch(
            submitProfileFormThunk({
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            address,
            city,
            zipCode,
            state,
            country,
            })                  
        );
        setShouldSubmit(false); 
        }
    }, [shouldSubmit])
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            autoFocus
                            required
                            value={user.firstName}
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
                            value={user.lastName}
                            onChange={handleLastNameChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label = "Email"
                            variant = "outlined"
                            fullWidth
                            autoFocus
                            required
                            value = {user.email}
                            onChange = {handleEmailChange}
                        />  

                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label = "Password"
                            variant = "outlined"
                            fullWidth
                            autoFocus
                            required
                            value = {user.password}
                            onChange = {handlePasswordChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label = "Confirm Password"
                            variant = "outlined"
                            fullWidth
                            autoFocus
                            required
                            value = {user.confirmPassword}
                            onChange = {handleConfirmPasswordChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label = "Address"
                            variant = "outlined"
                            fullWidth
                            autoFocus
                            required
                            value = {user.address}
                            onChange = {handleAddressChange}
                        />  
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label = "City"
                            variant = "outlined"
                            fullWidth
                            autoFocus
                            required
                            value = {user.city}
                            onChange = {handleCityChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label = "Zip Code"
                            variant = "outlined"
                            fullWidth
                            autoFocus
                            required
                            value = {user.zipCode}
                            onChange = {handleZipCodeChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label = "State"
                            variant = "outlined"
                            fullWidth
                            autoFocus
                            required
                            value = {user.state}
                            onChange = {handleStateChange}

                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label = "Country"
                            variant = "outlined"
                            fullWidth
                            autoFocus
                            required
                            value = {user.country}
                            onChange = {handleCountryChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Button 
                            type="submit"
                            variant="contained"
                            color="primary"
                            onChange={handleSubmit}
                        >
                            Update
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </div>

                            
                        







    );        
            
    
}
export default ProfileContent;