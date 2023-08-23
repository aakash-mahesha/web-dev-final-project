import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const Welcome = () => {
    return (
        <Box>
            <Grid container spacing={6}
                sx={{ p: 15 }}
            >
                <Grid item xs={12}
                    sx={{ fontWeight: 700 }}
                >
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h2"
                                sx={{ color: "text.secondary", p: 1 }}
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