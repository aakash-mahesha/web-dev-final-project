
import React, { useEffect, useMemo, useState } from 'react';
import { TextField, Button, Grid, Typography, List } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { findAllUsersThunk, findUserByIdThunk, deleteUserThunk, updateUserThunk } from '../../../thunks/user-thunks';
import { Box, ListItemText, ListItem } from '@mui/material';
import { Password } from '@mui/icons-material';
import * as eventService from "../../../services/event-service";
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
function EventManageTable() {

    const { currentUser } = useSelector((state) => state.auth);
    const [username, setUsername] = useState(currentUser.details);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rowId, setRowId] = useState(null);


    const [events, setEvents] = useState([]);
    
    const columns = useMemo(() => [
        { field: 'eventName', headerName: 'Event', width: 150, editable: true },
        { field: 'startDate', headerName: 'Start Date', width: 150, editable: true},
        
        { field: 'endDate', headerName: 'End Date', width: 150, editable: true },
        { field: 'published', headerName: 'Published', type: 'singleSelect',
        valueOptions: ['true','false'], width: 100, editable: true },
        
        {
            field: 'reservation', headerName: 'Reservation', type: 'singleSelect',
            valueOptions: ['true','false'], width: 100, editable: true
        },
        {field:'maxReservation',headerName:'Capacity',width:50 ,editable:true},
        
        
    ],
        [rowId]
    );




    //     {
    //         field: 'actions',
    //         headerName: 'Actions',
    //         type: 'actions', width: 100
    //     }


    const getEvents = async () => {
        const events = await eventService.findEvents();
        setEvents(events);
    };

    const handleClick = () => { navigate('/create-event') }


    useEffect(() => {
        getEvents();
    }, []);

    // useEffect(() => {
    //     dispatch(findAllUsersThunk(),findUserByTypeThunk())

    // }, []);

    return (
        <div>
            <Typography variant="h4" sx={{ mb: 2 }}>
                Event Management
            </Typography>
            <div>
            <Button onChange={handleClick}>Create Event</Button>
           
        </div>

            <Box
                sx={{
                    height: 500,
                    width: '100%',
                    '& .actions': {
                        color: 'text.secondary',
                    },
                    '& .textPrimary': {
                        color: 'text.primary',
                    },
                }}
            >
                <DataGrid
                    rows={events}
                    columns={columns}
                    editMode="row"
                    getRowId={(events) => events._id}

                />
            </Box>
        </div>
    );




}
export default EventManageTable;