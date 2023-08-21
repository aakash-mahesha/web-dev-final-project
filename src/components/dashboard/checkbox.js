import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import React from 'react';
import { Typography, Paper} from '@mui/material';
import { PanoramaPhotosphereRounded } from '@mui/icons-material';
import Header from './header';


export default function CheckboxesGroup() {
  const [state, setState] = React.useState({
    music: true,
    sports: false,
    arts: false,
    theatre: false,
    family: false,
    tech: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  const { music, sports, arts,theatre, family,tech} = state;
  //const error = [gilad, jason, antoine].filter((v) => v).length !== 2;

  return (
    <Paper>
        <Header subtitle ="Your Interests"/>
    <Box sx={{ display: 'flex' }}>
        
      <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">
      
        
        
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={music} onChange={handleChange} name="music" />
            }
            label="Music"
          />
          <FormControlLabel
            control={
              <Checkbox checked={sports} onChange={handleChange} name="sports" />
            }
            label="Sports"
          />
          <FormControlLabel
            control={
              <Checkbox checked={tech} onChange={handleChange} name="tech" />
            }
            label="tech"
          />
        </FormGroup>
        
      </FormControl>
      <FormControl
        required
        
        component="fieldset"
        sx={{ m: 3 }}
        variant="standard"
      >
       
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox checked={theatre} onChange={handleChange} name="theatre" />
            }
            label="Theatre"
          />
          <FormControlLabel
            control={
              <Checkbox checked={family} onChange={handleChange} name="family" />
            }
            label="Family"
          />
          <FormControlLabel
            control={
              <Checkbox checked={arts} onChange={handleChange} name="arts" />
            }
            label="Arts"
          />
        </FormGroup>
        
      </FormControl>
    </Box>
    </Paper>
  );
}