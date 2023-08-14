// tag behavior based on NearHuscarl's response to: https://stackoverflow.com/questions/69532940/is-there-a-material-ui-component-to-search-select-tags-like-in-stackoverflow
// and mui freeSolo multiple values autocomplete tutorial: https://mui.com/material-ui/react-autocomplete/

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';

import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers';

import Tags from "./tags.js";

const SearchForm = () => {
    const dispatch = useDispatch();

    const [searchString, setSearchString] = useState('');

    const handleSearchStringChange = (event) => {
        setSearchString(event.target.value);
    }

    const [scope, setScope] = useState({
        db: true,
        google: false,
    }); // add other search scopes here

    const handleScopeChange = (event) => {
        setScope({
            ...scope,
            [event.target.name]: event.target.checked,
        });
        console.log(event.target.name)
    };

    const { db, google } = scope;
    const error = [db, google].filter((v) => v).length === 0;

    const [dist, setDist] = useState('');

    const handleDistChange = (event) => {
        setDist(event.target.value);
    };

    const [startDateAndTime, setStartDateAndTime] = useState(dayjs());
    const [endDateAndTime, setEndDateAndTime] = useState(dayjs());

    const handleEventStartDateChange = (event) => {
        setStartDateAndTime(event);
    }

    const handleEventEndDateChange = (event) => {
        setEndDateAndTime(event);
    }

    const constructSearch = () => {
        const startDateAndTimeString = startDateAndTime.toString();
        const endDateAndTimeString = endDateAndTime.toString();
        const search = {
            searchString,
            scope,
            dist,
            startDateAndTimeString,
            endDateAndTimeString
        }
        
        return search;
    }

     const handleSubmit = (event) => {
        const search = constructSearch();
        dispatch(submitSearchThunk(search));
    }

    return (
        <Box component="form" noValidate onSubmit={handleSubmit}
            sx={{
                '& > :not(style)': { m: 1, width: '90%' },
            }}
            autoComplete="off">
            <Grid container spacing={2}>
                <Grid container>
                    <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-start", pl: 2 }}>
                        <Typography variant="h6">
                            Search for Events
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        autoFocus
                        required
                        id="search-string"
                        label="Enter keyword or location"
                        value={searchString}
                        onChange={handleSearchStringChange}
                    />
                </Grid>
                <FormControl
                    component="fieldset"
                    error={error}
                    sx={{ ml: 2, mt: 1 }}
                    variant="standard"
                >
                    <FormLabel component="legend">Search scope</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox checked={db} onChange={handleScopeChange} name="db" />
                            }
                            label="Saved events"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox checked={google} onChange={handleScopeChange} name="google" />
                            }
                            label="Public events"
                        />
                    </FormGroup>
                    <FormHelperText>Please select at least one scope to search</FormHelperText>
                </FormControl>
                <FormControl
                    sx={{ ml: 2, minWidth: 130 }}
                    variant="standard"
                >
                    <InputLabel id="dist-label">Max distance</InputLabel>
                    <Select
                        labelId="dist-label"
                        id="dist"
                        value={dist}
                        label="Distance"
                        onChange={handleDistChange}
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>10 miles</MenuItem>
                        <MenuItem value={25}>25 miles</MenuItem>
                        <MenuItem value={50}>50 miles</MenuItem>
                        <MenuItem value={100}>100 miles</MenuItem>
                    </Select>
                </FormControl>
                <FormControl
                    component="fieldset"
                    sx={{ ml: 2, mt: 3, width: "95%" }}
                    variant="standard"
                >
                    <FormLabel sx={{ mb: 2 }} component="legend">Filter by tag</FormLabel>
                    <Autocomplete
                        multiple
                        id="tags-filled"
                        options={Tags}
                        freeSolo
                        renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                            ))
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select tags"
                            />
                        )}
                    />
                </FormControl>

                <Grid item xs={12}
                    sx={{ display: "flex", justifyContent: "flex-start", pl: 2 }}
                >
                    <FormLabel component="legend">Filter by date</FormLabel>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DateTimePicker
                        label="Start Range"
                        value={startDateAndTime}
                        onChange={handleEventStartDateChange} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <DateTimePicker
                        label="End Range"
                        value={endDateAndTime}
                        onChange={handleEventEndDateChange} />
                </Grid>
            </Grid>

            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSubmit}
            >
                Search
            </Button>
        </Box>
    );
}

export default SearchForm