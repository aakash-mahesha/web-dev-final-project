import { Typography, Box, Container,Paper,Grid} from "@mui/material";
import MainLayout from "../layout/main-layout";
import Header from "../header";

import ProfileContent from "../../../form/edit-profile/profile";
import CheckboxesGroup from "../checkbox";
const ProfileScreen = () => {
    return(
        <>
        
        <Box>
            <MainLayout/>

        </Box>
        <Container item md={6} lg={10} xl={12}>
            <Paper>
                <Grid justify = "center">
            <Header subtitle ="Profile"/>
            </Grid>
            </Paper>
        <Box>
            
        <ProfileContent/>
        <CheckboxesGroup/>

        </Box>
        </Container>
        </>
    )
}
export default ProfileScreen ;