import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';

const EventDetails = ({
    event = {
        "title": "2021 Austin City Limits Music Festival",
        "date": {
            "start_date": "Oct 1",
            "when": "Oct 1 – 10"
        },
        "address": [
            "Zilker Park, 2207 Lou Neff Rd",
            "Austin, TX"
        ],
        "pos": ["39.742043", "-104.991531"],
        "link": "https://www.austintexas.org/event/austin-city-limits-music-festival/350781/",
        "description": "One of the country's largest celebrations of live music, this two weekend, six-day festival brings the magic of the famed public TV series \"Austin City Limits\" outside the studio and into Austin's...",
        "venue": {
            "name": "Zilker Park",
            "rating": 4.8,
            "reviews": 837,
            "link": "https://www.google.com/search?q=Zilker+Park&ludocid=11191514603003015866&ibp=gwp%3B0,7"
        },
        "thumbnail": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8mRlkCYd_eqWXP6BjfIHI8_m35omm6PkpHEYS9jFoq1wz3O4ra2i8mz4&s",
        "host": {
            "firstname": "alice",
            "lastname": "wonderland",
            "_id": "123"
        }
    }
}) => {
    // when calling, pass only selected event (via url)
    return (
        <div>
            <ListItem disablePadding>
                <ListItemButton component={Link} to='/search'>
                    <ListItemText primary="Back to results" />
                </ListItemButton>
            </ListItem>
            <Divider />
            <div>
                <div>{event.title}</div>
                <div><img src={event.thumbnail} /></div>
            </div>
            <div>
                <label for="date">
                    Date
                </label>
                <span id="date">
                    <div>{event.date.start_date}</div>
                    <div>{event.date.when}</div>
                </span>
            </div>
            <div>
                <label for="address">
                    Address
                </label>
                <span id="address">
                    <div>{event.address[0]}</div>
                    <div>{event.address[1]}</div>
                </span>
            </div>
            <div>
                {event.description}
                <a target='_blank' rel='noopener noreferrer' href={event.link}>Read more on event site</a>
            </div>
            <div>
                <label for="venue">
                    Venue
                </label>
                <div id="venue">
                    <div>{event.venue.name}</div>
                    <div>
                        <span>{event.venue.rating} stars</span>
                        <span> </span>
                        <span>{event.venue.reviews} reviews</span>
                    </div>
                    <a target='_blank' rel='noopener noreferrer' href={event.venue.link}>Venue details</a>
                </div>
            </div>
            <div>
                <label for="host">
                    Host
                </label>
                <div id="host">
                    {event.host.firstname} {event.host.lastname}
                </div>
            </div>
        </div>
    )
}

export default EventDetails