import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

const Description = () => {
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
                sx={{ textAlign: "left", justifyContent: "left", position: 'relative', }}
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
        </Box>
    )
}

export default Description