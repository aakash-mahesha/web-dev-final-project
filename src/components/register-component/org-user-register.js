import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useState } from 'react';
import InterestTabBox from './interest-tab-box';
import Button from '@mui/material/Button';


const OrgRegisterPage = ({interestTabsList, onSubmit }) => {

    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [stateName, setStateName] = useState('');
    const [zipcode, setZipcode] = useState(null);
    const [country, setCountry] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [orgId, setOrgId] = useState('');
    const [orgName, setOrgName] = useState('');
    
    const[errors, setErrors] = useState({
        username: false,
        firstname: false,
        lastname: false,
        password: false,
        confirmPassword: false,
        orgId : false,
        orgName : false,
        email: false,
        addressLine1: false,
        addressLine2: false,
        city: false,
        stateName:false,
        zipcode: false,
        country : false
      })

    const handleOrgRegisterSubmit = (event)=>{
        event.preventDefault();
        const formData = {
          username,
          firstname,
          lastname,
          password,
          email,
          orgData:{
            orgId: orgId,
            orgName: orgName,
          },
          address:{
            addressLine1,
            addressLine2,
            city, 
            stateName,
            zipcode,
            country
          },
          tags : selectedTags,
        }



        const nestedFields = ["address", "orgData"]
        const newErrors = {};
        for(const field in formData){
          if(nestedFields.find(nestedField => nestedField === field) !== undefined){
            for(const subfield in formData[field]){
              if (formData[field][subfield] === '' || formData[field][subfield] === null){
                newErrors[subfield] = true
              }
              else{
                newErrors[subfield] = false
              }
            }
          }
          else{
            if (formData[field] === ''){
              newErrors[field] = true
            }
            else{
              newErrors[field] = false
            }
          }
        }
        if(confirmPassword === ""){
          newErrors["confirmPassword"] = true  
        }
        console.log(newErrors)
        setErrors(newErrors)
        
        
        if(Object.values(newErrors).some((error) => error)){
          return;
        }
        onSubmit({form_type:"org-user", formData})
    }

    const handleTagChange = (event, newTags) => {
      setSelectedTags(newTags)
    }

  return (
   
      <Box
        component="form"
        noValidate
        onSubmit={handleOrgRegisterSubmit}
        sx={{ mt: 3, width: "100%" }}
      >
        <Grid container spacing={3} maxWidth="xl" sx={{ marginTop: 3 }}>
          <Grid item xs={12} sm={12} md={6} sx={{ justifyContent: "start" }}>
            <Grid container sx={{ display: "flex", flexDirection: "column" }}>
              <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
                Enter your details
              </Typography>
              <Grid container spacing={4}>
              <Grid
                  item
                  xs={12}
                  sm={12}
                  md={6}
                  sx={{ marginBottom: { xs: -2, sm: -2, md: 2 } }}
                >
                  <TextField
                    autoComplete="given-name"
                    name="firstname"
                    required
                    fullWidth
                    id="firstName"
                    label="Enter First Name"
                    placeholder="First Name"
                    autoFocus
                    onChange={(e) => setFirstname(e.target.value)}
                    helperText={errors.firstname ? 'Field cannot be empty' : ''}
                    sx={{
                      '& .MuiFormHelperText-root': {
                        color: errors.firstname ? 'red' : 'inherit', 
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={12} md={6} sx={{ marginBottom: 2 }}>
                  <TextField
                    autoComplete="family-name"
                    name="lastname"
                    required
                    fullWidth
                    id="lastName"
                    label="Enter Last Name"
                    placeholder="Last Name"
                    onChange={(e) => setLastname(e.target.value)}
                    helperText={errors.lastname ? 'Field cannot be empty' : ''}
                    sx={{
                      '& .MuiFormHelperText-root': {
                        color: errors.lastname ? 'red' : 'inherit', 
                      },
                    }}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField
                  name="username"
                  required
                  fullWidth
                  id="userName"
                  label="Enter Username"
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                  helperText={errors.username ? 'Field cannot be empty' : ''}
                  sx={{
                    '& .MuiFormHelperText-root': {
                      color: errors.username ? 'red' : 'inherit', 
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField
                  autoComplete="email"
                  name="Email"
                  required
                  fullWidth
                  id="email"
                  label="Enter Email"
                  placeholder="youremail@xyz.com"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  helperText={errors.email ? 'Field cannot be empty' : ''}
                  sx={{
                    '& .MuiFormHelperText-root': {
                      color: errors.email ? 'red' : 'inherit',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField
                  autoComplete="Organization Id"
                  name="orgId"
                  required
                  fullWidth
                  id="orgId"
                  label="Enter Organization Id"
                  placeholder="Your Org ID"
                  onChange={(e) => setOrgId(e.target.value)}
                  helperText={errors.orgId ? 'Field cannot be empty' : ''}
                  sx={{
                    '& .MuiFormHelperText-root': {
                      color: errors.orgId ? 'red' : 'inherit', 
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField
                  autoComplete="Oganization Name"
                  name="orgName"
                  required
                  fullWidth
                  id="orgName"
                  label="Enter Organization Name"
                  placeholder="EventBrite, Amazon"
                  onChange={(e) => setOrgName(e.target.value)}
                  helperText={errors.orgName ? 'Field cannot be empty' : ''}
                  sx={{
                    '& .MuiFormHelperText-root': {
                      color: errors.orgName ? 'red' : 'inherit', 
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField
                  
                  name="Password"
                  required
                  fullWidth
                  id="password"
                  label="Enter Password"
                  placeholder="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  helperText={errors.password ? 'Field cannot be empty' : ''}
                  sx={{
                    '& .MuiFormHelperText-root': {
                      color: errors.password ? 'red' : 'inherit', 
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField
                  // autoComplete="given-name"
                  name="Confirm Password"
                  required
                  fullWidth
                  id="confirmPassword"
                  label="Confirm Password"
                  placeholder="confirm password"
                  type="password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  helperText={errors.confirmPassword ? 'Field cannot be empty' : ''}
                  sx={{
                    '& .MuiFormHelperText-root': {
                      color: errors.confirmPassword ? 'red' : 'inherit', 
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField
                  autoComplete="address-line1"
                  name="address-line1"
                  required
                  fullWidth
                  id="address-line1"
                  label="Address"
                  placeholder="Address"
                  onChange={(e) => setAddressLine1(e.target.value)}
                  helperText={errors.addressLine1 ? 'Field cannot be empty' : ''}
                  sx={{
                    '& .MuiFormHelperText-root': {
                      color: errors.addressLine1 ? 'red' : 'inherit', 
                    },
                  }}
                />
              </Grid>

              <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField
                  autoComplete="address-line2"
                  name="address-line2"
                  required
                  fullWidth
                  id="address-line2"
                  label="Apt/Unit No."
                  placeholder="Ex: Apt 3 or Unit 2"
                  onChange={(e) => setAddressLine2(e.target.value)}
                  helperText={errors.addressLine2 ? 'Field cannot be empty' : ''}
                  sx={{
                    '& .MuiFormHelperText-root': {
                      color: errors.addressLine2 ? 'red' : 'inherit', 
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="address-level2"
                  onChange={(e) => setCity(e.target.value)}
                  helperText={errors.city ? 'Field cannot be empty' : ''}
                  sx={{
                    '& .MuiFormHelperText-root': {
                      color: errors.city ? 'red' : 'inherit', 
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  label="State"
                  name="state"
                  autoComplete="address-level1"
                  onChange={(e) => setStateName(e.target.value)}
                  helperText={errors.stateName ? 'Field cannot be empty' : ''}
                  sx={{
                    '& .MuiFormHelperText-root': {
                      color: errors.stateName ? 'red' : 'inherit', 
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField
                  required
                  fullWidth
                  id="zipcode"
                  label="Zipcode"
                  name="zipcode"
                  autoComplete="postal-code"
                  onChange={(e) => setZipcode(e.target.value)}
                  helperText={errors.zipcode ? 'Field cannot be empty' : ''}
                  type = "number"
                  sx={{
                    '& .MuiFormHelperText-root': {
                      color: errors.zipcode ? 'red' : 'inherit', 
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField
                  required
                  fullWidth
                  id="country"
                  label="Country"
                  name="country"
                  autoComplete="country"
                  onChange={(e) => setCountry(e.target.value)}
                  helperText={errors.country ? 'Field cannot be empty' : ''}
                  sx={{
                    '& .MuiFormHelperText-root': {
                      color: errors.country ? 'red' : 'inherit', 
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            
            <Typography component="h1" variant="h4" sx={{ mb: 2 , alignItems:'center', justifyContent:'center'}}>
              Select the tags that interest you!
            </Typography>
            <Grid container>
              <Grid item sx={{ display: 'flex', justifyContent: 'center'}}>
                <InterestTabBox interestTabsList={interestTabsList} selectedTags={selectedTags}  handleTagChange={handleTagChange}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, width: "50%"}}
            >
              Register
            </Button>
          </Grid>
      </Box>
  );
};
export default OrgRegisterPage;
