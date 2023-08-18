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
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = Math.floor(Math.random() * 100);
        
        setRows((oldRows) => [...oldRows, { id, name: '', date: '', location: '', host: '',email: '' }]);
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
    const [rows, setRows] = React.useState(initialRows);
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
        setRows(rows.filter((row) => row.id !== id));
    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    const columns = [
        { field: 'id', headerName: 'EventId', width: 150, editable: true },

        { field: 'name', headerName: 'Name', width: 150,editable: true},
        { field: 'date', headerName: 'Date', width: 150,editable: true },
        { field: 'location', headerName: 'Location', width: 150, editable: true },
        { field: 'host', headerName: 'Host', width: 150, editable: true },
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
                rows={rows}
                columns={columns}
                editMode="row"
                getRowId={(row) => row.id}
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                  toolbar: EditToolbar,
                }}
                slotProps={{
                  toolbar: { setRows, setRowModesModel },
                }}
              />
            </Box>
          );
        }
export default EventTable;



