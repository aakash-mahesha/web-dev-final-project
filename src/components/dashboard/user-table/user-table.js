
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
import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router";
import { findAllUsersThunk,findUserByIdThunk,createUserThunk,
  deleteUserThunk,updateUserThunk } from '../../../thunks/user-thunks';



const initialRows = [
    {   id: 1,
        username: 'Snow',
        password: '123456',
        fistname: 'John',
        lastname: 'Snow',
        email: 'Jsnow@gmail.com',
        user_type: 'regular',
    },
    {   id: 2,
        username: 'lin',
        password: '123456',
        fistname: 'Lin',
        lastname: 'Li',
        email: 'lilin@gmail.com',
        user_type: 'regular',
    },
    {   id: 3,
        username: 'SCC',
        password: '123456',
        fistname: 'SCC',
        lastname: 'SCC',
        email: 'SCC@gmail.com',
        user_type: 'organization',

    },
    {   id: 4,
        username: 'NEU',
        password: '123456',
        fistname: 'Library',
        lastname: 'NEU',
        email: 'neulibrary@gmail.com',
        user_type: 'organization',

    },
]

function EditToolbar(props) {
    const { setRows, setRowModesModel } = props;

    const handleClick = () => {
        const id = Math.floor(Math.random() * 100);
        
        setRows((oldRows) => [...oldRows, { id, username: '', firstname: '', lastname: '', email: '' }]);
        setRowModesModel((oldModel) => ({
            ...oldModel,
            [id]: { mode: GridRowModes.Edit, fieldToFocus: 'username' },
        }));
    };

    return (
        <GridToolbarContainer>
            <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
                Add user
            </Button>
        </GridToolbarContainer>
    );
}
function UserTable() {
    
    const { currentUser, users } = useSelector((state) => state.users);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        dispatch(findAllUsersThunk());
    }, []);

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
        { field: 'username', headerName: 'Username', width: 150, editable: true },

        { field: 'password', headerName: 'Password', type: Password, width: 150, editable: true },
        { field: 'fistname', headerName: 'First name', width: 150, editable: true },
        { field: 'lastname', headerName: 'Last name', width: 150, editable: true },
        { field: 'email', headerName: 'Email', width: 150, editable: true },
        {
            field: 'user_type', headerName: 'User type', type: 'singleSelect',
            valueOptions: ['regular', 'organization'], width: 150, editable: true
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
export default UserTable;






