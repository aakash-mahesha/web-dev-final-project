import { Typography } from "@mui/material";

import LayoutPage from ".";
import EventDetails from "../event-page/event-details";

const ExamplePage = () => {
    const icon = () => {
        return (
            <Typography variant="h5">
                Hi
            </Typography>
        );
    }
    const pageContent = () => {
        return (
            <EventDetails />
        );
    }

    return (
        <LayoutPage Content={pageContent} />
        // <LayoutPage Content={pageContent} Icon={icon}/>
    );
}

export default ExamplePage