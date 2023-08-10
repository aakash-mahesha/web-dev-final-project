import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, InputLabel, Checkbox, FormControlLabel, Chip } from '@mui/material';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { submitEventFormThunk } from '../../services/event-form-thunks';

function EventForm() {
    const dispatch = useDispatch();

  const [eventName, setEventName] = useState('');
  const [startDateAndTime, setStartDateAndTime] = useState(dayjs());
  const [endDateAndTime, setEndDateAndTime] = useState(dayjs());
  const [eventDescription, setEventDescription] = useState('');
  const [address, setAddress] = useState('');
  const [isReservation, setIsReservation] = useState(false);
  const [maxPeople, setMaxPeople] = useState('0');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [selectedImages, setImages] = useState([]);
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const handleEventNameChange = (event) => {
    setEventName(event.target.value);
  };

  const handleEventStartDateChange = (event) => {
    setStartDateAndTime(event);
  }

  const handleEventEndDateChange = (event) => {
    setEndDateAndTime(event);
  }

  const handleEventAddressChange = (event) => {
    setAddress(event.target.value);
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
    const startDateAndTimeString = startDateAndTime.toString();
    const endDateAndTimeString = endDateAndTime.toString();
    const formData = {
      eventName,
      startDateAndTimeString,
      endDateAndTimeString,
      address,
      isReservation,
      maxPeople,
      tags,
      selectedImages,
      publish: publishBool
    }
    return formData;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setShouldSubmit(true);
  };

  const handleSaveDraft = (event) => {
    event.preventDefault();
    setShouldSubmit(true);
  };

  useEffect(() => {
    if(shouldSubmit) {
      const formData = constructForm(true);
      dispatch(submitEventFormThunk(formData));
      setShouldSubmit(false);
    }
  }, [shouldSubmit])

  return (
    <div>
      <Grid container spacing={3} maxWidth='sm' alignItems="flex-start">
        <Grid item xs={12}>
            <Typography variant="h6">Event Details</Typography>
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
        <Grid item xs={12}>
          <TextField
            label="Address of the Event"
            variant="outlined"
            fullWidth
            required
            value={address}
            onChange={handleEventAddressChange}
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
        <Button variant="contained" color="primary" onClick={handleSubmit}>
                Publish Event
            </Button>
        </Grid>
        <Grid item xs={6}>
            <Button variant="outlined" color="primary" onClick={handleSaveDraft}>
            Save Draft
            </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default EventForm;