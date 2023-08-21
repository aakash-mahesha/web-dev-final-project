import { useSelector } from "react-redux"
import { findAllUsersThunk } from "../../thunks/user-thunks";

const HomePage = () => {
    const { currentUser } = useSelector(state => state.auth);

    const arrTenOrLess = (arr) => (arr.length > 10 ? arr.slice(10) : arr);

    if (currentUser.loggedIn) {
        const tenLikedEvents = arrTenOrLess(currentUser.likedEventIds);
        const tenGoingEvents = arrTenOrLess(currentUser.goingEventIds);


    } else {
        const findEndFieldList = (userList, field) => {
            const endsList = [];
            userList.map((user) => {
                const fieldList = user[field];
                const lastElement = fieldList[field.length - 1];
                endsList.push(lastElement);
            });

            return endsList;
        }

        const allUsers = findAllUsersThunk();
        const tenUsersList =  arrTenOrLess(allUsers);

        const tenLikedEvents = findEndFieldList(tenUsersList, "likedEventIds");
        const tenGoingEvents = findEndFieldList(tenUsersList, "goingEventIds");
    }

    return (
        // welcome to mapverse
        // brief description/tagline
        // link to search
        // links register/login (loggedIn=false) or profile (loggedIn=true)
        // likedEvents and goingEvents (as lists in side-by-side grids)
        []
    )
}