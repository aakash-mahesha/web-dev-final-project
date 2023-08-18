
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
  Button
} from '@mui/material';
import React, { useEffect } from 'react';


const EditEventCard = () =>{
    const events = [{eventId: 123,title:"Tina - The Tina Turner Musical",Date:"2023-10-10",address:"main street",photoURL:"https://s1.ticketm.net/dam/c/393/b74d3ddc-a5f3-4e09-a801-89c36b774393_106071_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=82&height=46&fit=crop&auto=webp"},
    {eventId: 234,title:"Tina - The Tina Turner Musical",Date:"2023-10-10",address:"main street",photoURL:"https://s1.ticketm.net/dam/c/393/b74d3ddc-a5f3-4e09-a801-89c36b774393_106071_TABLET_LANDSCAPE_LARGE_16_9.jpg?width=82&height=46&fit=crop&auto=webp"}]

    const info_url =null;
    return(
        <Paper>
        <Box>
        
        <List>
          {events.slice(0, 4).map((event, i) => (
            <Box key={event.eventId}>
              <ListItem>
                {/* <ListItemAvatar>
                  <Avatar alt={event?.name} src={event?.photoURL} /> */}
                {/* </ListItemAvatar> */}
                <Box
                    component="img"
                    sx={{
                        height: 60,
                        width: 120,
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
                <Button variant="outlined" onClick ={info_url}> Edit</Button>
              </ListItem>
              {i !== 3 && <Divider variant="inset" />}
            </Box>
          ))}
        </List>
      </Box>
      </Paper>
    );
}
export default EditEventCard;


