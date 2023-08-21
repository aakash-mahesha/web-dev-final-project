
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  Button,
  Icon
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect } from 'react';
import {useDispatch} from "react-redux";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
const EventCard = () =>{
    const events = [
      {eventId: 123,
        title:"Tina - The Tina Turner Musical",
        Date:"2023-10-10",
        address:"main street",
        photoURL:"https://s1.ticketm.net/dam/c/393/b74d3ddc-a5f3-4e09-a801-89c36b774393_106071_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=82&height=46&fit=crop&auto=webp"},
    {eventId: 234,
      title:"Tina - The Tina Turner Musical",
      Date:"2023-10-10",
      address:"main street",
      photoURL:"https://s1.ticketm.net/dam/c/393/b74d3ddc-a5f3-4e09-a801-89c36b774393_106071_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=82&height=46&fit=crop&auto=webp"}]

    const info_url =null;
    const dispatch = useDispatch();
    // const deleteEventHandler = (eventId) => {
    //    // dispatch(deleteTuit(id));
    //     dispatch(deleteTuitThunk(eventId)); // invoke the deleteTuitThunk from the remove icon
    // }
    return(
        <Paper>
        <Box>
        
        <List>
          {events.slice(0, 4).map((event, i) => (
            <Box key={event.eventId}>
             {/* <ClearIcon fontSize='small'  style={{ float: 'right'}}  /> */}
              <ListItem>
                {/* <ListItemAvatar>
                  <Avatar alt={event?.name} src={event?.photoURL} /> */}
                {/* </ListItemAvatar> */}
                
                <Box
                    component="img"
                    sx={{
                        height: 60,
                        width: 80,
                        m:2
                        
                    }} 
                    alt={event?.name} src={event?.photoURL}
 
                    />
                
                <ListItemText 
                  primary={event?.title}
                  secondary={event?.Date}
                //   secondary={`Time Created: ${moment(user?.createdAt).format(
                //     'YYYY-MM-DD H:mm:ss'
                //   )}`}
                />
                
                <Button variant="outlined" onClick ={info_url}> See Details</Button>
              </ListItem>
              {i !== 3 && <Divider variant="inset" />}
            </Box>
          ))}
        </List>
      </Box>
      </Paper>
    );
}
export default EventCard;


