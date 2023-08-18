import { Typography } from "@mui/material";

import LayoutPage from "../components/layout-page";

import DashComponent from "../components/dashboard-component";

const UserEvents = () => {
    const icon = () => {
        return (
            <Typography variant="h5">
                Welcome
            </Typography>
        );
    }
    const pageContent = () => {
        return (
            <gr />
        );
    }

    return (
        <LayoutPage Content={pageContent} />
        // <LayoutPage Content={pageContent} Icon={icon}/>
    );
}
export default UserEvents;