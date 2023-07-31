import { Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const Markers = (
    {
        markers = [
            {
                popup: 'p1',
                pos: [52.51, 13.38],
            },
            {
                popup: 'p2',
                pos: [55.51, 15.38],
            },
            {
                popup: 'p3',
                pos: [52.51, 15.38],
            }
        ]
    }
) => {
    const customIcon = new Icon({
        iconUrl: '/cust-icon.png',
        iconSize: [20, 20]
    });

    // const markers = [
    //     {
    //         popup: 'p1',
    //         pos: [52.51, 13.38],
    //     },
    //     {
    //         popup: 'p2',
    //         pos: [55.51, 15.38],
    //     },
    //     {
    //         popup: 'p3',
    //         pos: [52.51, 15.38],
    //     }
    // ]

    return (
        <div>
            {
                markers.map(marker =>
                    <Marker position={marker.pos}
                        icon={customIcon}>
                        <Popup>
                            {marker.popup}
                        </Popup>
                    </Marker>
                )
            }
        </div>
    );

    // <ul className="list-group">
    //         {
    //             tuits.map(tuit =>
    //                 <TuitSummaryItem
    //                     key={tuit._id}
    //                     tuit={tuit} />
    //             )
    //         }
    //     </ul>
}

export default Markers