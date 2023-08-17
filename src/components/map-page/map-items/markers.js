import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import EventPopup from './event-popup';
import events from "./events.json";

const Markers = ({events}
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

    return (
        <div>
            {
                events.map(event =>
                    <Marker
                        key={event._id}
                        position={event.pos}
                        icon={customIcon}>
                        <Popup>
                            {/* <div>{marker.popup}</div>
                            <div>bottom text</div> */}
                            <EventPopup event={event} />
                        </Popup>
                    </Marker>
                )
            }
        </div>
    );
}

export default Markers