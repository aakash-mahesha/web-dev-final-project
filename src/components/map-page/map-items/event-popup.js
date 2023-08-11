import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const EventPopup = (
    // { event = {
    //     title: 'my event',
    //     description: 'this is my event',
    //     pos: [39.742043, -104.991531],
    //     address: {
    //         street: '31415 pie st',
    //         city: 'denver',
    //         state: 'CO',
    //         zip: 80012,
    //     },
    //     image: 'assets/reacticon.png',
    //     host: {
    //         firstname: 'alice',
    //         lastname: 'wonderland',
    //         username: 'aw',
    //         _id: '123' // use to link to profile pg
    //     }
    // }
    // }
    { event }
) => {
    return (
        <Grid container spacing={2}
            sx={{
                p: 1, textAlign: "left", display: "flex", justifyContent: "flex-start", alignItems: "center"
            }}
        >
            <Grid item xs={8}>
                <Typography variant='h6'>{event.title}</Typography>
            </Grid>
            <Grid item xs={4}>
                <Grid container
                    sx={{
                        display: "flex", justifyContent: "flex-end", textAlign: "right"
                    }}
                >
                    <Grid item xs={12}>
                        <Typography variant='body2'>{event.date.start_date}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box
                            component="img"
                            sx={{
                                width: "100%",
                            }}
                            src={event.thumbnail} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default EventPopup