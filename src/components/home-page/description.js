import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

/*
Introducing MapVerse, where the world is your event canvas and personalized adventures await! In this dynamic fusion of technology and community, we invite you to embark on a journey that redefines event discovery. MapVerse, a cutting-edge web application built on the MERN stack, brings you the simplicity of a map. Whether you're a passionate event-goer or a visionary event organizer, our platform is tailored just for you. Get ready to explore, create, and connect like never before, as we unveil a new era of event experiences. Welcome to MapVerse, where your event dreams come to life, one click at a time.
*/

const Description = () => {
    // const textArray = [
    //     "Create events.",
    //     "Search events.",
    //     "Like events.",
    //     "Go to events.",
    //     "Map events."
    // ]

    // // source: https://unsplash.com/photos/1-29wyvvLJA
    // const imageUrl = 'https://images.unsplash.com/photo-1473163928189-364b2c4e1135?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'

    const textString =
        `
    Introducing MapVerse, where the world is your event canvas and personalized 
    adventures await! In this dynamic fusion of technology and community, we 
    invite you to embark on a journey that redefines event discovery. Whether 
    you're a passionate event-goer or a visionary event organizer, get ready to 
    explore, create, and connect like never before, as we unveil a new era of 
    event experiences. Welcome to MapVerse, where your event dreams come to 
    life, one click at a time.
    `

    return (
        // <Box
        //     sx={{
        //         mt: 6,
        //         p: 10,
        //         position: 'relative',
        //         backgroundColor: 'grey.800',
        //         color: '#fff',
        //         backgroundSize: 'cover',
        //         backgroundRepeat: 'no-repeat',
        //         backgroundPosition: 'center',
        //         backgroundImage: `url(${imageUrl})`,
        //     }}
        // >
        //     <Box
        //         sx={{
        //             position: 'absolute',
        //             top: 0,
        //             bottom: 0,
        //             right: 0,
        //             left: 0,
        //             backgroundColor: 'rgba(0,0,0,.3)',
        //         }}
        //     />
        //     {<img style={{ display: 'none' }} src={imageUrl} alt='party image' />}
        //     <Grid container spacing={2}
        //         sx={{ textAlign: "left", justifyContent: "left", position: 'relative', }}
        //     >
        //         {textArray.map((textItem, index) => (
        //             <Grid item xs={12} key={index}>
        //                 <Typography variant="h5" fontWeight={800}
        //                     sx={{ color: "common.white" }}
        //                 >
        //                     {textItem}
        //                 </Typography>
        //             </Grid>
        //         ))}
        //     </Grid>
        // </Box>
        <Box>
            <Grid container spacing={6}
                sx={{ p: 15 }}
            >
                <Grid item xs={12}
                >
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="body">
                                {textString}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Description