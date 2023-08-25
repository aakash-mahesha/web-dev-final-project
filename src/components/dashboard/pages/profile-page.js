import { Typography, Box, Container,Paper,Grid} from "@mui/material";
import MainLayout from "../layout/main-layout";
import CheckboxesGroup from "../checkbox";
import ProfileForm from "../../../form/edit-profile/edit-profile";
const ProfileScreen = () => {
    return(
        <>
        
        <Box>
            <MainLayout/>

        </Box>
        <Container md={6} lg={10} xl={12}>
            
        
            
        <Box>
            
        <ProfileForm/>
        <CheckboxesGroup/>

        </Box>
        </Container>
        </>
    )
}
export default ProfileScreen ;