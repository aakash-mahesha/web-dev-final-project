import React, { useState } from 'react';
import { TextField, Button, Grid, Container, Box , Typography, InputLabel, Checkbox, FormControlLabel, Chip, Backdrop, CircularProgress } from '@mui/material';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { createEventThunk } from '../../../thunks/event-form-thunks.js';
import postreq from '../../../utils/postreq.js';
import { useSelector } from 'react-redux';
import { updateUser } from '../../../utils/update-user-events.js';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const defaultTheme = createTheme();

const EventForm = () => {
  
    const dispatch = useDispatch();
    const {currentUser} = useSelector(state => state.auth);
    // https://mapverse-server.onrender.com/api/events
  const uploadAPI = "https://mapverse-server.onrender.com/api/files/upload"
  const UploadMultipleAPI = "https://mapverse-server.onrender.com/files/multi-upload"
  const [eventName, setEventName] = useState('');
  const [startDateAndTime, setStartDateAndTime] = useState(dayjs());
  const [endDateAndTime, setEndDateAndTime] = useState(dayjs());
  const [eventDescription, setEventDescription] = useState('');
  const [venueName, setVenueName] = useState('');
  const [street, setStreetName] = useState('');
  const [city, setCityName] = useState('');
  const [state, setStateName] = useState('');
  const [country, setCountryName] = useState('');
  const [zipcode, setZipCode] = useState('');
  const [isReservation, setIsReservation] = useState(false);
  const [maxPeople, setMaxPeople] = useState('0');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedImages, setImages] = useState([]);
  const [shouldPublish, setShouldPublish] = useState(false);
  const [uploadLinks, setUploadLinks] = useState([]);
  const [formLoading, setFormLoading] = useState(false);

  function resetStates() {
    setEventName('');
    setStartDateAndTime(dayjs());
    setEndDateAndTime(dayjs());
    setEventDescription('');
    setCityName('');
    setStreetName('');
    setCountryName('');
    setStateName('');
    setVenueName('');
    setZipCode('');
    setIsReservation(false);
    setMaxPeople('0');
    setTags([]);
    setTagInput('')
    setUploadLinks([]);
    setFormLoading(false);
    setImages([]);
  }

  const handleEventNameChange = (event) => {
    setEventName(event.target.value);
  };

  const handleEventStartDateChange = (event) => {
    setStartDateAndTime(event);
  }

  const handleEventEndDateChange = (event) => {
    setEndDateAndTime(event);
  }

  const handleEventDescriptionChange = (event) => {
    setEventDescription(event.target.value);
  }

  const handleCheckboxChange = (event) => {
    setIsReservation(event.target.checked);
  };

  const handleTagInputChange = (event) => {
    setTagInput(event.target.value);
  };

  const handleTagAdd = () => {
    if (tagInput.trim() !== '') {
      setTags([...tags, tagInput]);
      setTagInput('');
    }
  };

  const handleTagDelete = (tagToDelete) => {
    const updatedTags = tags.filter((tag) => tag !== tagToDelete);
    setTags(updatedTags);
  };

  const handleImageChange = (event) => {
    const selectedImages = event.target.files;
    setImages(Array.from(selectedImages));
  };

  function constructForm(publishBool) {
    const startDateAndTimeString = startDateAndTime.toISOString();
    const endDateAndTimeString = endDateAndTime.toISOString();
    const formData = {
      eventName,
      startDateAndTimeString,
      endDateAndTimeString,
      eventDescription,
      address: {
        venueName,
        street,
        city,
        state,
        country,
        zipcode
      },
      isReservation,
      maxPeople,
      tags,
      uploadLinks,
      publish: publishBool,
      hostDetails: {
        name: currentUser.loggedIn ? (currentUser.details.firstname + " " + currentUser.details.lastname) : "Test",
        email: currentUser.loggedIn ? (currentUser.details.email) : "testing@nomail.com"
      }
    }
    return formData;
  }

  async function uploadImage() {
    console.log("uploading?");
    let links = [];
      const data = new FormData()
      let response = {};
      for (let i = 0; i < selectedImages.length; i++) {
        data.append('file', selectedImages[i], selectedImages[i].name);
      }
      if(selectedImages.length === 1) {
        response = await postreq(uploadAPI, data)
      }
      else if(selectedImages.length >= 1) {
        response = await postreq(UploadMultipleAPI, data);
      }
      else {
        return;
      }
      console.log("resp from img upload",response);
      if(response.status === 200) {
        links.push(response.data.public_url);
        console.log(links);
        setUploadLinks(links.flat());
        console.log("in upload image",uploadLinks);
      }
      else {
        links = ['Upload failed'];
      }
  }

  const uploadFormAndUpdate = async(formData) => {
    let eventObj = await dispatch(createEventThunk(formData));
    const newEventID = eventObj.payload;
    if(newEventID.includes("400")) {
      alert('There was an error creating this event. Please try again.');
      return;
    }
    else {
      await updateUser(dispatch, currentUser,"createdEventIds","ADD",newEventID);
    }
  }

  const handleSubmit = async (event, action) => {
    event.preventDefault();
    setFormLoading(true);
    await uploadImage();
    console.log("outside upload", uploadLinks);
    if (action === 'submit') {
      setShouldPublish(true);
    }
    if (action === 'saveDraft') {
      setShouldPublish(false);
    }
    const formData = constructForm(shouldPublish);
    console.log(formData); 
    await uploadFormAndUpdate(formData);
    setFormLoading(false);
    // console.log("Loading, Submitted, Message", loading, submittedForm, message);
    resetStates();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={formLoading}
          >
          <CircularProgress color="inherit" />
          </Backdrop>
          <Container component='main' maxWidth="md">
          <CssBaseline/>
            <Box sx={{
                    marginTop:10,
                    marginBottom:8,
                    display:'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
          <Grid container spacing={3} alignItems="flex-start">
            <Grid item xs={12}>
                <Typography variant="h4">Event Details</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Event Name"
                variant="outlined"
                fullWidth
                autoFocus
                required
                value={eventName}
                onChange={handleEventNameChange}
              />
              
            </Grid>
            <Grid item xs={6}>
              <DateTimePicker 
                label="Start Date, Time" 
                value={startDateAndTime} 
                onChange={handleEventStartDateChange}/>
            </Grid>
            <Grid item xs={6}>
              <DateTimePicker 
                label="End Date, Time" 
                value={endDateAndTime}
                onChange={handleEventEndDateChange}/>
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="Venue Name"
                  variant="outlined"
                  fullWidth
                  required
                  value={venueName}
                  onChange={(event) => {setVenueName(event.target.value)}}
                />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Street"
                variant="outlined"
                fullWidth
                required
                value={street}
                onChange={(event) => {setStreetName(event.target.value)}}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="City"
                  variant="outlined"
                  fullWidth
                  required
                  value={city}
                  onChange={(event) => {setCityName(event.target.value)}}
                />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="State"
                  variant="outlined"
                  fullWidth
                  required
                  value={state}
                  onChange={(event) => {setStateName(event.target.value)}}
                />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="Country"
                  variant="outlined"
                  fullWidth
                  required
                  value={country}
                  onChange={(event) => {setCountryName(event.target.value)}}
                />
            </Grid>
            <Grid item xs={6}>
              <TextField
                  label="Zipcode"
                  variant="outlined"
                  fullWidth
                  required
                  value={zipcode}
                  onChange={(event) => {setZipCode(event.target.value)}}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                multiline
                maxRows={6}
                placeholder="Enter Event Description. The more descriptive the better!"
                variant="outlined"
                fullWidth
                required
                value={eventDescription}
                onChange={handleEventDescriptionChange}
                style={{ width: '100%', padding: '8px' }}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isReservation}
                    onChange={handleCheckboxChange}
                    color="primary"
                  />
                }
                label="Reservation Required?"
              />
            </Grid>
            {isReservation && (
              <Grid item xs={12}>
                <InputLabel>Max Number of People</InputLabel>
                <TextField
                  type="number"
                  variant="outlined"
                  value={maxPeople}
                  onChange={(event) => setMaxPeople(event.target.value)}
                />
              </Grid>
            )}
            <Grid item xs={12}>
              <InputLabel>
              <FontAwesomeIcon icon={faTag} style={{ marginRight: '8px' }} />
                Event Tags
              </InputLabel>
              <TextField
                variant="outlined"
                placeholder="Enter tags"
                value={tagInput}
                onChange={handleTagInputChange}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    handleTagAdd();
                  }
                }}
              />
              <Button variant="outlined" onClick={handleTagAdd}>
                Add Tag
              </Button>
              <div>
                {tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => handleTagDelete(tag)}
                    style={{ margin: '4px' }}
                  />
                ))}
              </div>
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Upload Event Images</InputLabel>
              <input
                accept="image/*"
                type="file"
                multiple
                onChange={handleImageChange}
              />
            </Grid>
            <Grid item xs={6}>
            <Button variant="contained" color="primary" onClick={event => {handleSubmit(event, 'submit')}}>
                    Publish Event
                </Button>
            </Grid>
            <Grid item xs={6}>
                <Button variant="outlined" color="primary" onClick={event => {handleSubmit(event, 'saveDraft')}}>
                Save Draft
                </Button>
            </Grid>
            </Grid>
          </Box>
          </Container>
          </ThemeProvider>
  );
}

export default EventForm;
// beautify this page