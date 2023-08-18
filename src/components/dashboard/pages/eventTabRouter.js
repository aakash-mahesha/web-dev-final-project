import {BrowserRouter,Routes,Route} from "react-router-dom";
import EditEventCard from "../card/editEventCard";
function EventTabRouter(){
    return (
        

        <><Box>
            <DashComponent/>
        </Box>
        <Routes>
                <Route path="/dashboard/" element={<EventCard/>}/>
                                <Route path="/dashboard/events/" element={<EditEventCard/>}/>
                                <Route path="/dashboard/events/" element={<EditEventCard/>}/>
                                <Route path="/dashboard/events/" element={<EditEventCard/>}/>

                                

        </Routes></>
        
        
    );
}
    export default EventTabRouter;