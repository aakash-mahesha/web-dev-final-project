// tag behavior based on NearHuscarl's response to: https://stackoverflow.com/questions/69532940/is-there-a-material-ui-component-to-search-select-tags-like-in-stackoverflow
// and mui freeSolo multiple values autocomplete tutorial: https://mui.com/material-ui/react-autocomplete/
// search params functionality based on: https://reactrouter.com/zh/main/hooks/use-search-params and https://www.robinwieruch.de/react-router-search-params/

import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';

import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormHelperText from '@mui/material/FormHelperText';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';

import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers';

import SearchResults from './search-results.js';
import Tags from "./tags.js";
import * as service from "../../../services/search-service.js";

import { apiSearchThunk, launchSearchThunk } from '../../../services/search-thunks.js';


const exampleApiCall = 'https://app.ticketmaster.com/discovery/v2/events?apikey=pCKILJrFzfEJbfLpAXeawuyAnpFgMCPo&keyword=music&locale=*&startDateTime=2023-08-15T14:00:00Z&endDateTime=2023-08-26T14:00:00Z&city=new%20york';
const apiCallZip = 'https://app.ticketmaster.com/discovery/v2/events?apikey=pCKILJrFzfEJbfLpAXeawuyAnpFgMCPo&keyword=music&postalCode=02114&locale=*&startDateTime=2023-08-15T14:00:00Z&endDateTime=2023-10-31T14:00:00Z';

const SearchForm = () => {
    const { results, loading } = useSelector(state => state.results);

    const initialResponse = (results ? results : []);

    const [response, setResponse] = useState(initialResponse);

    // const paramStruct = {
    //     savedEvents: true,
    //     publicEvents: false,
    //     keyword: '',
    //     location: '',
    //     startDateTime: '',
    //     endDateTime: '',
    //     tags: '' // - separated string
    // }

    var submit = false;

    const [searchParams, setSearchParams] = useSearchParams();

    // const paramList = [
    //     "savedEvents",
    //     "publicEvents",
    //     "keyword",
    //     "location",
    //     "startDateTime",
    //     "endDateTime",
    //     "tags"
    // ];

    // let defaultParams = paramList.map((param) => {
    //     searchParams.get(param)
    // });

    const [keyword, setKeyword] = useState('');

    const handleKeywordChange = (event) => {
        setKeyword(event.target.value);
    }

    const [location, setLocation] = useState('');

    const handleLocationChange = (event) => {
        setLocation(event.target.value);
    }


    const [scope, setScope] = useState('db');

    const handleScopeChange = (event) => {
        // setScope({
        //     ...scope,
        //     [event.target.name]: event.target.checked,
        // });
        setScope(event.target.value);
    }

    // const { db, api } = scope;
    // const error = [db, api].filter((v) => v).length === 0;

    const [startDateAndTime, setStartDateAndTime] = useState(dayjs());
    const [endDateAndTime, setEndDateAndTime] = useState(dayjs());

    const handleEventStartDateChange = (event) => {
        setStartDateAndTime(event);
    }

    const handleEventEndDateChange = (event) => {
        setEndDateAndTime(event);
    }

    const [tags, setTags] = useState([]);

    const handleTagsChange = (event, value) => {
        console.log(value);
        setTags(value);
    }

    const [inputTags, setInputTags] = useState('');

    const handleInputTagsChange = (event, value) => {
        console.log(value);
        setInputTags(value);
    }
    // onChange={(event, value) => console.log(value)}

    const initializeExistingParams = () => {
        // const params = ["savedEvents", "publicEvents", "keyword", "location", "startDateTime", "endDateTime", "tags"];
        // const setters = [((dbVal) => setScope({...scope, db: dbVal,})), ((apiVal) => setScope({...scope, api: apiVal,})), setKeyword, setLocation, setStartDateAndTime, setEndDateAndTime, setTags];
        const params = ["scope", "keyword", "postalCode", "startDateTime", "endDateTime", "tags"];
        const setters = [
            setScope,
            setKeyword,
            setLocation,
            ((dateStartString) => setStartDateAndTime(dayjs(dateStartString))),
            ((dateEndString) => setEndDateAndTime(dayjs(dateEndString))),
            ((tagString) => setTags(tagString.split('-')))
        ];

        params.map((param, index) => {
            let value = searchParams.get(param);
            if (value && value !== 0) {
                let setter = setters[index];
                setter(value);
            }
        });
    }

    useEffect(() => {
        initializeExistingParams();
    }, [searchParams]);

    const serializeFormQuery = () => {
        const startDateAndTimeString = startDateAndTime.toString();
        const endDateAndTimeString = endDateAndTime.toString();
        const tagString = tags.join('-'); // - separated string
        const conditionalInclusion = (name, value) => {
            console.log('incl val', value);
            return value && { [name]: value }
        };

        const query = {
            // savedEvents: db,
            // publicEvents: api,
            // ...keyword && { keyword: keyword },
            // ...location && { location: location },
            // ...startDateAndTimeString && { startDateTime: startDateAndTimeString },
            // ...endDateAndTimeString && { endDateTime: endDateAndTimeString },
            // ...tagString && { tags: tagString },
            scope: scope,
            ...conditionalInclusion("keyword", keyword),
            ...conditionalInclusion("postalCode", location),
            ...conditionalInclusion("startDateTime", startDateAndTimeString),
            ...conditionalInclusion("endDateTime", endDateAndTimeString),
            ...conditionalInclusion("tags", tagString),
        }

        console.log('ser query', query)

        return query;
    }

    const dispatch = useDispatch();

    const handleSubmit = (event) => {
        event.preventDefault();
        submit = true;
        // The serialize function here would be responsible for
        // creating an object of { key: value } pairs from the
        // fields in the form that make up the query.
        let params = serializeFormQuery();
        setSearchParams(params);
        console.log('search params', params)
        dispatch(apiSearchThunk(params));
    }

    // const [results, setResults] = useState([]);

    // // const testFn = (input) => ['hi'];

    // const search = async (params) => {
    //     const response = await service.fullSearch(params); // this will be search function from services
    //     setResults(response);
    // }

    // useEffect(() => {
    //     initializeExistingParams();
    //     console.log(scope)
    //     // search(searchParams)
    //     if (scope === 'api') {
    //         // async function apiResults() {
    //         //     const { payload } = dispatch(apiSearchThunk(searchParams));
    //         //     setResponse(payload);
    //         // };
    //         // apiResults();
    //         dispatch(apiSearchThunk(searchParams));
    //     }
    //     console.log(results)
    // }, [searchParams]);

    // useEffect(() => {
    //     initializeExistingParams();
    //     console.log(scope)
    //     // search(searchParams)
    //     if (scope === 'api') {
    //         // async function apiResults() {
    //         //     const { payload } = dispatch(apiSearchThunk(searchParams));
    //         //     setResponse(payload);
    //         // };
    //         // apiResults();
    //         dispatch(apiSearchThunk(searchParams));
    //     }
    //     console.log(results)
    // }, [searchParams, submit]);

    // make it so that values below are set based on url!!! (like ex)

    return (
        <div>
            <Box component="form" noValidate
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
                            id="search-keyword"
                            label="Enter keyword"
                            value={keyword}
                            onChange={handleKeywordChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            id="search-location"
                            label="Enter zip code"
                            value={location}
                            onChange={handleLocationChange}
                        />
                    </Grid>
                    <FormControl
                        component="fieldset"
                        // error={error}
                        sx={{ ml: 2, mt: 1 }}
                        variant="standard"
                    >
                        <FormLabel component="legend">Search scope</FormLabel>
                        <FormGroup>
                            {/* <FormControlLabel
                                control={
                                    <Checkbox checked={db} onChange={handleScopeChange} name="db" />
                                }
                                label="Saved events"
                            />
                            <FormControlLabel
                                control={
                                    <Checkbox checked={api} onChange={handleScopeChange} name="api" />
                                }
                                label="Public events"
                            /> */}
                            <RadioGroup
                                aria-labelledby="demo-controlled-radio-buttons-group"
                                name="scope"
                                value={scope}
                                onChange={handleScopeChange}
                            >
                                <FormControlLabel value="db" control={<Radio />} label="MapVerse" />
                                <FormControlLabel value="api" control={<Radio />} label="Ticketmaster" />
                            </RadioGroup>
                        </FormGroup>
                        {/* <FormHelperText>Please select at least one scope to search</FormHelperText> */}
                    </FormControl>
                    {scope.db && <FormControl
                        component="fieldset"
                        sx={{ ml: 2, mt: 3, width: "95%" }}
                        variant="standard"
                    >
                        <FormLabel sx={{ mb: 2 }} component="legend">Filter by tag (saved events only)</FormLabel>
                        {/* <Autocomplete
                            multiple
                            id="tags-filled"
                            defaultValue={tags}
                            options={Tags}
                            freeSolo
                            onChange={handleTagsChange}
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
                        /> */}
                        <Autocomplete
                            multiple
                            control="true"
                            id="tags-filled"
                            value={tags}
                            onChange={handleTagsChange}
                            inputValue={inputTags}
                            onInputChange={handleInputTagsChange}
                            options={Tags}
                            renderInput={(params) => <TextField {...params} label="Select tags" />}
                        />
                    </FormControl>}
                    <Grid item xs={12}
                        sx={{ display: "flex", justifyContent: "flex-start", pl: 2 }}
                    >
                        <FormLabel component="legend">Filter by event start date</FormLabel>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DateTimePicker
                            label="Start of range"
                            value={startDateAndTime}
                            onChange={handleEventStartDateChange} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <DateTimePicker
                            label="End of range"
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
            <Divider />
            <SearchResults results={results} loading={loading} />
        </div>
    );
}

export default SearchForm