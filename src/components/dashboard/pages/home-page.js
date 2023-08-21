import { Typography, Box, Grid, Container, Paper } from "@mui/material";
import MainLayout from "../layout/main-layout";
import Header from "../header";
import EventCard from "../card/eventCard";

import GotoEventTabs from "../tab/goto-event-tab";
import LikeEventCard from "../card/wishlist";
const Home = () => {
    return (
        <>

            <Box>
                <MainLayout />

            </Box>

            <Grid container spacing={2}>
               
                <Grid item xs ={12} md={8} >
                <Header subtitle="Events" />
                    <GotoEventTabs />
                    <Header subtitle="Wishlist" />
                    <GotoEventTabs />
                    

                    

                </Grid>
              
                
                <Grid item md={4} display={{ xs: "none", md: "block" }}>
                <Header subtitle="Wishlist" />
                <LikeEventCard />

                  <Header subtitle="following" />
                  <LikeEventCard />


                </Grid>
               
              
            </Grid>

            

        </>
    )
}
export default Home;