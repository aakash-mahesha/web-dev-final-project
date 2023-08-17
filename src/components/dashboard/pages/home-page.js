import { Typography, Box, Container,Paper} from "@mui/material";
import MainLayout from "../layout/main-layout";
import Header from "../header";
import EventCard from "../card/eventCard";
const Home = () => {
    return(
        <>
        
        <Box>
            <MainLayout/>

        </Box>
        <Container item md={6} lg={10} xl={12}>
            <Paper>
            <Header subtitle ="Upcomming Event"/>
            </Paper>
        <Box>
            
            <EventCard/>

        </Box>
        </Container>
        </>
    )
}
export default Home ;