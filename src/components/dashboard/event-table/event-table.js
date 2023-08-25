import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
import { Password } from '@mui/icons-material';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { findEventThunk } from '../../../thunks/event-thunks';
import { useState } from 'react';

const initialRows = [
    {   id: 12,
        name: 'Pink Concert',
        date: '2023-10-10',
        location: 'san jose',
        host: 'Pink',
        email: 'pink@gmail.com',
        status: 'active',
    },
    {   id: 23,
        name: 'Pink Concert',
        date: '2023-10-10',
        location: 'san jose',
        host: 'Pink',
        email: 'pink@gmail.com',
        status: 'active',
    },
    {   id: 45,
        name: 'Pink Concert',
        date: '2023-10-10',
        location: 'san jose',
        host: 'Pink',
        email: 'pink@gmail.com',
        status: 'active',
    },
    {   id: 55,
        name: 'Pink Concert',
        date: '2023-10-10',
        location: 'san jose',
        host: 'Pink',
        email: 'pink@gmail.com',
        status: 'active',
    },
]

function EditToolbar(props) {
    const { setEvents, setRowModesModel } = props;

    const handleClick = () => {
        const id = Math.floor(Math.random() * 100);
        
        setEvents((oldRows) => [...oldRows, { id, name: '', date: '', location: '', host: '',email: '' }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add New Event
            </Button>
        </GridToolbarContainer>
    );
}
function EventTable() {
    const dispatch = useDispatch();
    const [events, setEvents] = useState([]);
    useEffect(() => {
      const getAllEvents = async() => {
        const allEvents = await dispatch(findEventThunk());
        console.log(allEvents.payload);
        setEvents(allEvents.payload);
      }
      getAllEvents();
    }, [])
    const [rowModesModel, setRowModesModel] = React.useState({});

    const handleRowEditStop = (params, event) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id) => () => {
        setEvents(events.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = events.find((row) => row.id === id);
        if (editedRow.isNew) {
            setEvents(events.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setEvents(events.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    const columns = [
        { field: '_id', headerName: 'EventId', width: 150, editable: true },

        { field: 'eventName', headerName: 'Name', width: 150,editable: true},
        { field: 'startDate', headerName: 'Date', width: 150,editable: true },
        { field: 'location', headerName: 'Location', width: 150, editable: true },
        { field: ['hostDetails','name'], headerName: 'Host', width: 150, editable: true },
        { field: 'email', headerName: 'Email', width: 150, editable: true },
        {
            field: 'status', headerName: 'Status', type: 'singleSelect',
            valueOptions: ['active', 'pending'], width: 150, editable: true
        },
        {
            field: 'action', type: 'actions',headerName: 'Action', width: 100, cellClassName: 'actions',
            getActions: ({ id }) => {
              const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
            
            
              if (isInEditMode) {
                return [
                  <GridActionsCellItem
                    icon={<SaveIcon />}
                    label="Save"
                    sx={{
                      color: 'primary.main',
                    }}
                    onClick={handleSaveClick(id)}
                  />,
                  <GridActionsCellItem
                    icon={<CancelIcon />}
                    label="Cancel"
                    className="textPrimary"
                    onClick={handleCancelClick(id)}
                    color="inherit"
                  />,
                ];
              }
      
              return [
                <GridActionsCellItem
                  icon={<EditIcon />}
                  label="Edit"
                  className="textPrimary"
                  onClick={handleEditClick(id)}
                  color="inherit"
                />,
                <GridActionsCellItem
                  icon={<DeleteIcon />}
                  label="Delete"
                  onClick={handleDeleteClick(id)}
                  color="inherit"
                />,
              ];
            },
          },
        ];
        return (
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
                getRowId={(event) => event._id}
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                  toolbar: EditToolbar,
                }}
                slotProps={{
                  toolbar: { setEvents, setRowModesModel },
                }}
              />
            </Box>
          );
        }
export default EventTable;



