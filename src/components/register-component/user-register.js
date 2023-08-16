import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { width } from '@mui/system';
import { ToggleButtonGroup } from '@mui/material';


const UserRegisterPage = ({interestTabs}) => {

    console.log(interestTabs)

    const handleRegisterSubmit = ()=>{
        return null
      }
      
  return (
   
      <Box
        component="form"
        noValidate
        onSubmit={handleRegisterSubmit}
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
            </Grid>
            
          </Grid>
        </Grid>
      </Box>
    
  );
};
export default UserRegisterPage;
