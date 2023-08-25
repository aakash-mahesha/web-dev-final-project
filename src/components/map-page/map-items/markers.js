import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Typography } from '@mui/material';


import EventPopup from './event-popup';
import VenuePopup from './venue-popup';

import events from "./events.json";

const Markers = ({ events }
    // {
    //     // markers = [
    //     //     {
    //     //         popup: 'p1',
    //     //         pos: [52.51, 13.38],
    //     //         event: 'e1',
    //     //     },
    //     //     {
    //     //         popup: 'p2',
    //     //         pos: [55.51, 15.38],
    //     //         event: 'e2',
    //     //     },
    //     //     {
    //     //         popup: 'p3',
    //     //         pos: [52.51, 15.38],
    //     //         event: 'e3',
    //     //     }
    //     // ]
    //     // events = [
    //     //     {
    //     //         title: 'my event',
    //     //         description: 'this is my event',
    //     //         pos: [39.742043, -104.991531],
    //     //         address: {
    //     //             street: '31415 pie st',
    //     //             city: 'denver',
    //     //             state: 'CO',
    //     //             zip: 80012,
    //     //         },
    //     //         image: 'assets/reacticon.png',
    //     //         host: {
    //     //             firstname: 'alice',
    //     //             lastname: 'wonderland',
    //     //             username: 'aw',
    //     //             _id: '123' // use to link to profile pg
    //     //         }
    //     //     },
    //     //     {
    //     //         title: 'my event2',
    //     //         description: 'this also is my event',
    //     //         pos: [40.742043, -104.991531],
    //     //         address: {
    //     //             street: '981 grav dr',
    //     //             city: 'denver',
    //     //             state: 'CO',
    //     //             zip: 80012,
    //     //         },
    //     //         image: 'assets/leafletlogo.png',
    //     //         host: {
    //     //             firstname: 'jane',
    //     //             lastname: 'doe',
    //     //             username: 'hi',
    //     //             _id: '234' // use to link to profile pg
    //     //         }
    //     //     },
    //     // ]
    // }
) => {
    const customIcon = new Icon({
        iconUrl: '/cust-icon.png',
        iconSize: [20, 20]
    });

    const structureMarkerData = (events) => {
        let markerObj = {};
        for (let i = 0; i < events.length; i++) {
            const event = events[i];
            if (event) {
                const address = event.address;
                if (address) {
                    const venueName = address.venueName;
                    if (venueName in markerObj) {
                        markerObj[venueName].venueEvents.push(event);
                    } else {
                        markerObj[venueName] = { coordinates: event.coordinates, venueEvents: [event,] };
                    }
                }
            }
        }
        return markerObj;
    }


    const generateMarkers = () => {
        const markerList = [];
        const markerData = structureMarkerData(events);
        for (var venue in markerData) {
            const events = markerData[venue].venueEvents;
            const eventList = events.map((event) => (
                <ListItem key={event._id} disablePadding>
                    {/* <Typography variant='body2'>{event.name}</Typography> */}
                    <EventPopup key={event._id} event={event} />
                </ListItem>
            ))
            const coordinates = markerData[venue].coordinates;
            markerList.push(
                <Marker
                    key={venue}
                    id={venue}
                    position={coordinates}
                    icon={customIcon}>
                    <Popup>
                        <List>
                            <ListItem disablePadding>
                                <Typography variant='h6'>{venue}</Typography>
                            </ListItem>
                            <ListItem disablePadding>
                                <Typography>Events:</Typography>
                            </ListItem>
                            {eventList}
                        </List>
                    </Popup>
                </Marker>);
        }
        console.log(markerList)
        return markerList;
    }

    const markers = generateMarkers();

    return (
        <div>
            {
                // events.map(event =>
                // <Marker
                //     key={event._id}
                //     position={event.pos}
                //     icon={customIcon}>
                //     <Popup>
                //         {/* <div>{marker.popup}</div>
                //         <div>bottom text</div> */}
                //         <EventPopup event={event} />
                //     </Popup>
                // </Marker>
                // )
                markers
            }
        </div>
    );
}

export default Markers