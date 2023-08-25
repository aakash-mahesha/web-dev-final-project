import { updateUserThunk } from "../thunks/user-thunks";
import { profileThunk } from "../thunks/auth-thunks";

const operations = ["ADD", "REMOVE"];

// Method to update the user backend if there's a change in event created/going/wishlisted.
// method needs a dispatch object from the calling react component, 
// currentState of the user with useSelector from the react component, 
// arrayName is basically the array in the user schema that you want to modify,
// operation can be either of add or remove
// value is the event id you want to add/remove to the arrayName. 
export async function updateUser(dispatch, currentState, arrayName, operation, value) {
    const currentUserDetails = currentState.details;
    // console.log("In update user, before push", currentUserDetails);
    if (currentUserDetails.hasOwnProperty(arrayName)) {
        let events = [...currentUserDetails[arrayName]];
        // console.log("before push",events);
        if(operations.includes(operation)) {
            switch (operation) {
                case "ADD":
                    events.push(value);
                    // console.log("after push", events);
                    break;
                
                case "REMOVE":
                    events = events.filter(item => item.event_id!== value.event_id);
                    break;
                default:
                    break;
            }
            const updatedUser = {...currentUserDetails};
            updatedUser[arrayName] = events;
            // console.log("Updated user after push in func:", updatedUser);
            await dispatch(updateUserThunk(updatedUser));
            await dispatch(profileThunk());
            return "Success";
        }

    }
    else {
        return "Failed";
    }
}