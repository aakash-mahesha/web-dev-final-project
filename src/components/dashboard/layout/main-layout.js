import { Box,Divider,Typography } from "@mui/material";

import LayoutPage from "../../layout-page";
import DashLayout from "./dashboard-layout";
import Header from "../header";

const MainLayout = () => {
    const icon = () => {
        return (
            <Typography variant="h5">
                Welcome
            </Typography>
        );
    }
    const pageContent = () => {
        return (
            <Box>
                <Header subtitle="hi"/>
                <Divider/>
            <DashLayout />
            </Box>
        );
    }

    return (
        <LayoutPage Content={pageContent} />
        // <LayoutPage Content={pageContent} Icon={icon}/>
    );
}
export default MainLayout;