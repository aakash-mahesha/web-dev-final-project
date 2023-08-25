import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const Welcome = () => {
    // return (
    // <Box>
    //     <Grid container spacing={6}
    //         sx={{ p: 15 }}
    //     >
    //         <Grid item xs={12}
    //             sx={{ fontWeight: 700 }}
    //         >
    //             <Grid container>
    //                 <Grid item xs={12}>
    //                     <Typography variant="h2"
    //                         sx={{ color: "text.secondary", p: 1 }}
    //                     >
    //                         Welcome to the MAPVERSE
    //                     </Typography>
    //                     <Typography variant="body">
    //                         We put events on the map.
    //                     </Typography>
    //                 </Grid>
    //             </Grid>
    //         </Grid>
    //     </Grid>
    // </Box>
    // );
    const textArray = [
        "Create events.",
        "Search events.",
        "Like events.",
        "Go to events.",
        "Map events."
    ]

    // source: https://unsplash.com/photos/1-29wyvvLJA
    const imageUrl = 'https://images.unsplash.com/photo-1473163928189-364b2c4e1135?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'

    return (
        <Box
            sx={{
                mt: 6,
                p: 10,
                position: 'relative',
                backgroundColor: 'grey.800',
                color: '#fff',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url(${imageUrl})`,
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                    backgroundColor: 'rgba(0,0,0,.3)',
                }}
            />
            {<img style={{ display: 'none' }} src={imageUrl} alt='party image' />}
            <Grid container spacing={2}
                sx={{ position: 'relative' }}
            >
                <Grid item xs={3}
                    sx={{ textAlign: "left", justifyContent: "left" }}
                >
                    {textArray.map((textItem, index) => (
                        <Grid item xs={12} key={index}>
                            <Typography variant="h5" fontWeight={800}
                                sx={{ color: "common.white" }}
                            >
                                {textItem}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
                <Grid item xs={9}
                    sx={{ fontWeight: 700, textAlign: "right", justifyContent: "right" }}
                >
                    <Grid container
                        sx={{ pt: 25 }}
                    >
                        <Grid item xs={12}>
                            <Typography variant="h2"
                                sx={{ color: "grey.400", p: 1 }}
                            >
                                Welcome to the MAPVERSE
                            </Typography>
                            <Typography variant="body">
                                We put events on the map.
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Welcome