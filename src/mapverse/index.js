import { configureStore } from "@reduxjs/toolkit";
import { ConfirmFlags } from "./component/create_event/confirm";
import EventForm from "./component/create_event";
import eventFormReducer from "./reducers/event-form-reducer.js"
import { Provider } from "react-redux";

function MapVerse() {
    const store = configureStore({
        reducer: {
            eventFormState: eventFormReducer
        }
    })
    return(
        <>
        <Provider store={store}>
            <EventForm/>
            <ConfirmFlags/>
        </Provider>
        </>
    )
}

export default MapVerse;