
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
    const { setUsers, setRowModesModel } = props;

    const handleClick = () => {
        const id = Math.floor(Math.random() * 100);
        
        setUsers((oldRows) => [...oldRows, { id, username: '', firstname: '', lastname: '', email: '' }]);
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
    const [users1, setUsers] = useState([]);
    const {users} = useSelector(state => state.user)
    console.log(users)
    const dispatch = useDispatch();
    useEffect(() => {
      const getLatestUsers = async() => {
        console.log('in useEffect')
        await dispatch(findAllUsersThunk());
      }
      getLatestUsers();
    }, []);

    // console.log("USER ARRAY",users);
    // const [rows, setUsers] = React.useState(users);
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

    const handleDeleteClick = (id) => async () => {
      console.log("In handle delete; Id : ", id)
      const response = await dispatch(deleteUserThunk(id))
      console.log(response)
      // users = users.filter((row) => row.id !== id);
      // setUsers(users.filter((row) => row.id !== id));


    };

    const handleCancelClick = (id) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        // const editedRow = users.find((row) => row.id === id);
        // console.log("PRINTING EDITED ROW",editedRow)
        // if (editedRow.isNew) {
        //     setUsers(users.filter((row) => row.id !== id));
        // }
    };

    const processRowUpdate = async (newRow) => {
        const updatedRow = { ...newRow, isNew: false };
        setUsers(users.map((row) => (row._id === newRow._id ? updatedRow : row)));
        await dispatch(updateUserThunk(newRow))
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };
    const columns = [
        { field: 'username', headerName: 'Username', width: 150, editable: true },

        { field: 'password', headerName: 'Password', type: Password, width: 150, editable: true },
        { field: 'firstname', headerName: 'First name', width: 150, editable: true },
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
                rows={users}
                columns={columns}
                editMode="row"
                getRowId={(row) => row._id}
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                slots={{
                  toolbar: EditToolbar,
                }}
                slotProps={{
                  toolbar: { setUsers, setRowModesModel },
                }}
              />
            </Box>
          );
        }
export default UserTable;






