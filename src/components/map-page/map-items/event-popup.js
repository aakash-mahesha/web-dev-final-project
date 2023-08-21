import dayjs from 'dayjs';
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
        // <Grid container spacing={2}
        //     sx={{
        //         p: 1, textAlign: "left", display: "flex", justifyContent: "flex-start", alignItems: "center"
        //     }}
        // >
        //     <Grid item xs={8}>
        //         <Typography>{event.name}</Typography>
        //     </Grid>
        //     <Grid item xs={4}>
        //         <Grid container
        //             sx={{
        //                 display: "flex", justifyContent: "flex-end", textAlign: "right"
        //             }}
        //         >
        //             <Grid item xs={12}>
        //                 <Typography variant='body2'>{dayjs(event.dates[0]).format('MMM D')}</Typography>
        //             </Grid>
        //             {/* <Grid item xs={12}>
        //                 <Box
        //                     component="img"
        //                     sx={{
        //                         width: "100%",
        //                     }}
        //                     src={event.image.url} />
        //             </Grid> */}
        //         </Grid>
        //     </Grid>
        // </Grid>

        <Grid container spacing={1}
            sx={{
                p: 0, textAlign: "left", display: "flex", justifyContent: "flex-start", alignItems: "center"
            }}
        >
            <Grid item xs={4}>
                <Typography variant='body2'>{dayjs(event.startDate).format('MMM D')}</Typography>
            </Grid>
            <Grid item xs={8}>
                <Typography variant='body2'>{event.eventName}</Typography>
            </Grid>
        </Grid>

    )
}

export default EventPopup