import {
    Avatar,
    Box,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemButton,
    Paper,
    Typography,
    Button
  } from '@mui/material';
  import React, { useEffect } from 'react';
  import MoreIcon from '@mui/icons-material/More';
  import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
  import ClearIcon from '@mui/icons-material/Clear';

import {useDispatch} from "react-redux";
import {deleteEventThunk} from "../../../thunks/event-thunks";
  const LikeEventCard = () =>{
      const events = [{eventId: 123,title:"Tina - The Tina Turner Musical",Date:"2023-10-10",address:"main street",photoURL:"https://s1.ticketm.net/dam/c/393/b74d3ddc-a5f3-4e09-a801-89c36b774393_106071_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=82&height=46&fit=crop&auto=webp"},
      {eventId: 234,title:"Tina - The Tina Turner Musical",Date:"2023-10-10",address:"main street",photoURL:"https://s1.ticketm.net/dam/c/393/b74d3ddc-a5f3-4e09-a801-89c36b774393_106071_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=82&height=46&fit=crop&auto=webp"}]
      const dispatch = useDispatch();
      const deleteEventHandler = (eventId) => {
        
         dispatch(deleteEventThunk(eventId)); // invoke the deleteTuitThunk from the remove icon
      }
      const info_url =null;
      return(
          <Paper>
          <Box>
          
          <List>
            {events.slice(0, 4).map((event, i) => (
              <Box key={event.eventId}>
                <ClearIcon fontSize='small'  style={{ float: 'right'}} onClick={deleteEventHandler} />
                <ListItem >
                
                  <ListItemAvatar>
                    <Avatar alt={event?.name} src={event?.photoURL}  />
                   </ListItemAvatar>
                 
                   <ListItemButton component="a" href="#details">
                  <ListItemText 
                    primary={event?.title}
                    secondary={event?.Date}
                  //   secondary={`Time Created: ${moment(user?.createdAt).format(
                  //     'YYYY-MM-DD H:mm:ss'
                  //   )}`}
                  />
                  </ListItemButton>
                  
                 <Box component="span" m="{1}"><Button variant="outlined" onClick ={info_url} size="small"> Add Event</Button></Box>
                </ListItem>
                
                {i !== 3 && <Divider variant="inset" />}
              </Box>
            ))}
          </List>
        </Box>
        </Paper>
      );
  }
  export default LikeEventCard;
  
  
  