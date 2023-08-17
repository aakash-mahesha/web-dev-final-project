import { Routes, Route } from "react-router";
import Home from "./pages/home-page";
import Events from "./pages/event-page";
import ProfileScreen from "./pages/profile-page";
import Admin from "./pages/admin-page";
function Dashboard(){
    return (
      <div>
        
        <Routes>
          <Route path="/" element={< Home/>}/>
            
              <Route path="/dashboard/home" element={< Home/>} />
              <Route path="/dashboard/events" element={< Events/>} />
              <Route path="/dashboard/profile" element={< ProfileScreen/>} />
              <Route path="/dashboard/admin" element={<Admin/>} />  

        </Routes>
        </div>
    );
}
    export default Dashboard;
