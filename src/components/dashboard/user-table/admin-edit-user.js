import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { Link } from "react-router-dom";
import Editor from "./editor.js";
import * as service from "../../../services/user-service";
import { Button, Typography,CssBaseline } from "@mui/material";

function UserEditor() {
  const { userId } = useParams();
 
  const { search } = useLocation();
  const back = search.split("=")[1];
  const [user, setUser] = useState({});

  const fetchUser = async () => {
    try {
    const user = await service.findUserById(userId);
   
    setUser(user);
    console.log(user);
    }catch (error) {
        console.log("Error fetching user:",error);
        }
  };
  const navigate = useNavigate();
  const saveUser = async () => {
    await service.updateUser(user);
    navigate(back);
  };

  const handleDeleteUser = async () => {
    await service.deleteUser(userId);
    navigate(back);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const form = {
    username: {},
    password: {
      widget: "password",
    },
    firstname: {
      label: "First Name",
    },
    lastname: {
      label: "Last Name",
    },
    role: {
      widget: "select",
      options: ["regular", "organization", "admin"],
    },
    email: {
    }
  };

  return (
    <div>
        <CssBaseline/>
      <Typography>
        User Editor
        </Typography>
        <Button onClick={saveUser} className="btn btn-success float-end">
          Save
        </Button>
        <Link to={back} className="btn btn-warning float-end me-2">
          Cancel
        </Link>
        <Typography>
            {userId } {username}
        </Typography>

      {/* <Editor obj={user} form={form} setObj={setUser} /> */}
     
      <Button onClick={handleDeleteUser} className="btn btn-danger float-end">
        Delete
      </Button>
      {search}
    </div>
  );
}

export default UserEditor;
