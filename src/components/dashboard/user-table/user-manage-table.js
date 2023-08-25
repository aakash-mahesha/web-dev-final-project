
import React, { useEffect, useMemo, useState } from 'react';
import { TextField, Button, Grid, Typography, List } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { Link,useLocation  } from 'react-router-dom';
import { findAllUsersThunk, findUserByIdThunk, deleteUserThunk, updateUserThunk } from '../../../thunks/user-thunks';
import { Box, ListItemText, ListItem } from '@mui/material';
import { Password } from '@mui/icons-material';
import * as userService from "../../../services/user-service";
import {
    GridRowModes,
    DataGrid,
    GridToolbarContainer,
    GridActionsCellItem,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
function UserManageTable() {

    const { currentUser } = useSelector((state) => state.auth);
    const [username, setUsername] = useState(currentUser.details);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [rowId, setRowId] = useState(null);
    const { search } = useLocation();
    const back = search.split("=")[1];


    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({});
    const columns = useMemo(() => [
        {
            field: 'username',
            headerName: 'Username',
            width: 150,
            editable: currentUser?.user_type === 'admin',
        },
        {
            field: 'password',
            headerName: 'Password',
            width: 150,
            editable: currentUser?.user_type === 'admin'
        },

        {
            field: 'fistname',
            headerName: 'First name',
            width: 150,
            editable: currentUser?.user_type === 'admin',
        },
        {
            field: 'lastname',
            headerName: 'Last name',
            width: 150,
            editable: currentUser?.user_type === 'admin',
        },
        {
            field: 'email',
            headerName: 'Email',
            width: 150,
            editable: currentUser?.user_type === 'admin'
        },

        {
            field: 'user_type',
            headerName: 'User type',
            type: 'singleSelect',
            valueOptions: ['regular', 'organization'],
            width: 100,
            editable: currentUser?.user_type === 'admin',
        },
        {
            field: 'privileges',
            headerName: 'Privileges',
            width: 150,
            editable: currentUser?.user_type === 'admin',
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            renderCell: (params) => (
                <div>
                    <Button onClick={() => handleUpdate(params.row)}>Update</Button>
                    <Button onClick={() => handleDelete(params.row._id)}>Delete</Button>
                </div>
            ),
        },
    ],
        [rowId]
    );


  


    const getUsers = async () => {
        const users = await userService.findAllUsers();
        setUsers(users);
    };



     //listitem {user.username} navigate(`/users/${user.username}`) 
     //when we click one user's name, we can go to the user's profile page ( findUserByusernameThunk)

    const handleClick = () => { navigate('/register') }
    const handleOrgClick = () => { navigate('/register/orgRegister') }
    const handleUserClick = () => { navigate('/register/orgRegister') }
    const [searchTerm, setSearchTerm] = useState('');
    const filteredUsers = users.filter(user => user.username.includes(searchTerm));
    const handleCreateNewUser = async () => {
        const actualUser = await userService.createUser(newUser);
       // navigate(`/users/${actualUser._id}`);
       navigate(`/users/${actualUser._id}}?back=/admin/users`);
    };


    const handleUpdate = (user) => {
        dispatch(updateUserThunk(user)); // Dispatch the update action
        //setRowId(null); // Clear the editing row
        navigate(`/admin/users/${user._id}?back=/admin/users`);
    };

    const handleDelete = (userId) => {
        dispatch(deleteUserThunk(userId)); // Dispatch the delete action
        setRowId(null); // Clear the editing row
    };
    useEffect(() => {
        getUsers();
    }, []);

    // useEffect(() => {
    //     dispatch(findAllUsersThunk(),findUserByTypeThunk())

    // }, []);

    return (
        <div>
            <Typography variant="h4" sx={{ mb: 2 }}>
                User Management
            </Typography>

            <Button
                onClick={handleCreateNewUser}
                className="btn btn-success float-end"
            >Create User
            </Button>
            <TextField
                label="Search by Username"
                variant="outlined"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                sx={{ mb: 2 }}
            />
            <div className="button-group">
                <Link to="/register/userRegister" >
                    <Button className="button-tile" variant="outlined" sx={{ mt: 3 }}>
                        Create Regular User
                    </Button>
                </Link>
                <Link to="/register/orgRegister">
                    <Button className="button-tile" variant="outlined" sx={{ mt: 3 }}>
                        Create Organization
                    </Button>
                </Link>


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
                    initialState={{
                        columns: {
                            columnVisibilityModel: {
                                // Hide privileges and email, the other columns will remain visible
                                password: false,
                                privileges: false,
                                email: false,
                            },
                        },
                    }}
                    rows={users}
                    // rows={filteredUsers}
                    columns={columns}
                    editMode="row"
                    getRowId={(users) => users._id}
                    rowsPerPageOptions={[5, 10, 20]}
                    // onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                    getRowSpacing={(params) => ({
                        top: params.isFirstVisible ? 0 : 5,
                        bottom: params.isLastVisible ? 0 : 5,
                    })}
                    onCellEditCommit={(params) => setRowId(params._id)}


                />
            </Box>
        </div>
    );




}
export default UserManageTable;