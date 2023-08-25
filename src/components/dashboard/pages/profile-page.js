import { Typography, Box, Container,Paper,Grid} from "@mui/material";
import MainLayout from "../layout/main-layout";
import CheckboxesGroup from "../checkbox";
<<<<<<< HEAD
import ProfileForm from "../../../form/edit-profile/edit-profile";
=======
// import ProfileForm from "../../../form/edit-profile/edit-profile";
import EditProfileBox from "../../../form/edit-profile/edit-profile-box.js";
>>>>>>> 5f19b7f75fc47e55a8e91cf93967458070bb6d6c
const ProfileScreen = () => {
    return(
        <>
        
        <Box>
            <MainLayout/>

        </Box>
        <Container md={6} lg={10} xl={12}>
            
        
            
        <Box>
            
<<<<<<< HEAD
        <ProfileForm/>
=======
        {/* <ProfileForm/> */}
        <EditProfileBox/>
>>>>>>> 5f19b7f75fc47e55a8e91cf93967458070bb6d6c
        <CheckboxesGroup/>

        </Box>
        </Container>
        </>
    )
}
export default ProfileScreen ;