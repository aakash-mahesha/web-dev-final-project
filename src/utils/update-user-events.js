import { updateUserThunk } from "../thunks/user-thunks";
import { profileThunk } from "../thunks/auth-thunks";

const operations = ["ADD", "REMOVE"];

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
                    events = events.filter(item => item!== value);
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