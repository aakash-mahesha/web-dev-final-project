import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from "react";
import { useDispatch } from 'react-redux';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const defaultTheme = createTheme();

const CreateEvent = () => {
    // const dispatch = useDispatch();
    const submitHandler = () => {

    };


    return(
        <ThemeProvider theme={defaultTheme}>
            <Container component='main' maxWidth="lg">
                <CssBaseline>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant='h5' align='left'>
                                Create Event
                            </Typography>
                        </Grid >
                        <Box component="form">
                            <TextField
                            autoComplete="given-name"
                            name="eventName"
                            required
                            id="eventName"
                            label="Event Name"
                            autoFocus
                            />
                            <DateTimePicker label="Start Date, Time" defaultValue={dayjs()}/>
                            <DateTimePicker label="End Date, Time" defaultValue={dayjs()}/>
                        </Box>
                    </Grid>
                </CssBaseline>

            </Container>
        </ThemeProvider>
    )
}

export default CreateEvent