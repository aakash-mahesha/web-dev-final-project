import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { width } from '@mui/system';
import { ToggleButtonGroup } from '@mui/material';
import { useState } from 'react';
import InterestTabBox from './interest-tab-box';
import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';


const OrgRegisterPage = ({interestTabsList, onSubmit }) => {

    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const [orgId, setOrgId] = useState('');
    const [orgName, setOrgName] = useState('');

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
          },
          tags : selectedTags,
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
                    autoFocus
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </Grid>
              </Grid>

              <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField
                  // autoComplete="given-name"
                  name="username"
                  required
                  fullWidth
                  id="userName"
                  label="Enter Username"
                  placeholder="Username"
                  autoFocus
                  onChange={(e) => setUsername(e.target.value)}
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
                  autoFocus
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
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
                  autoFocus
                  onChange={(e) => setOrgId(e.target.value)}
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
                  autoFocus
                  onChange={(e) => setOrgName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sx={{ mb: 2 }}>
                <TextField
                  // autoComplete="given-n"
                  name="Password"
                  required
                  fullWidth
                  id="password"
                  label="Enter Password"
                  placeholder="password"
                  autoFocus
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
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
                  autoFocus
                  type="password"
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
                  autoFocus
                  onChange={(e) => setAddressLine1(e.target.value)}
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
                  autoFocus
                  onChange={(e) => setAddressLine2(e.target.value)}
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
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            
            <Typography component="h1" variant="h4" sx={{ mb: 2 }}>
              Select the tags that interest you!
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <InterestTabBox interestTabsList={interestTabsList} selectedTags={selectedTags}  handleTagChange={handleTagChange}/>
                {/* <ToggleButton key={interestTabsList[0].value} value = {interestTabsList[0].value}>{interestTabsList[0].value}</ToggleButton> */}
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
