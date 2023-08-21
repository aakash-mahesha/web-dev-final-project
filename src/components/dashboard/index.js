import { Routes, Route } from "react-router";
import Home from "./pages/home-page";
import Events from "./pages/event-page";
import ProfileScreen from "./pages/profile-page";
import Admin from "./pages/admin-page";
import {Navigate} from "react-router-dom";

function Dashboard(){
    return (
      <div>
        
        <Routes>
          {/* <Route path="/" element={< Home/>}/> */}
          <Route path="/" element={<Navigate to="/dashboard/home" />}/>
          <Route path="/home" element={< Home/>} /> 
          <Route path="/myevents" element={<Events/>} />
          <Route path="/profile" element={<ProfileScreen/>} />
          <Route path="/admin" element={<Admin/>} />  

        </Routes>
        </div>
    );
}
    export default Dashboard;
