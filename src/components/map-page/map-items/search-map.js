// // --- (1), (2) & (3): install and import ---
// import { MapContainer, TileLayer } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import Markers from './markers';

// // -----------------------------------------------------

// function Map() {
//     // Berlin coordinates
//     // const position = [52.51, 13.38];
//     // denver -> update to be dynamically centerred
//     const position = ["39.742043", "-104.991531"];

//     // update base map? (diff langs now)

//     return (
//         <div className='map-component'>
//             {/* --- (5) Add leaflet map container --- */}
//             <div className='map'>
//                 <MapContainer center={position} zoom={6} scrollWheelZoom={false}>
//                     <TileLayer
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                         url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
//                     // --- (7) Alternative map style (attribution and url copied from the leaflet extras website) ---
//                     // attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
//                     // url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
//                     // --- -------------------------------------------------------------------------------------- ---
//                     />
//                     {/* <Marker position={position}
//                     icon={customIcon}
//                     >
//                         <Popup>
//                             Popup test
//                         </Popup>
//                     </Marker> */}
//                     <Markers />
//                 </MapContainer>
//             </div>
//         </div>
//     );
// }

// export default Map

// --- (1), (2) & (3): install and import ---
import React, { useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Markers, { bounds } from './markers';

// -----------------------------------------------------

function ResetSize({ map }) {
    const safeInvalidateSize = (map) => {
        try {
            return map.invalidateSize();
        } catch (error) {
            console.log(error);
            return map;
        }
    }
    // { setTimeout(() => { map.invalidateSize() }, 400); }
    setTimeout(() => { safeInvalidateSize(map) }, 100);

}

const getBounds = (events) => {
    let bounds = [
        [45.140009, -69.218322],
        [16.43333, -93.79528],
        [47.6062100, -122.3320700]
    ];
    if (events.length) {
        bounds = events.map(event => [Number(event.pos[0]), Number(event.pos[1])]);
    }
    return bounds;
}

function Map({ events }) {
    // Berlin coordinates
    // const position = [52.51, 13.38];
    // denver -> update to be dynamically centerred
    const [map, setMap] = useState(null);
    const position = ["39.742043", "-104.991531"];

    // update base map? (diff langs now)

    const displayMap = useMemo(
        () => (
            <div className='map-component'>
                {/* --- (5) Add leaflet map container --- */}
                <div className='map'>
                    <MapContainer scrollWheelZoom={false} ref={setMap}>
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                        // --- (7) Alternative map style (attribution and url copied from the leaflet extras website) ---
                        // attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
                        // url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
                        // --- -------------------------------------------------------------------------------------- ---
                        />
                        {/* <Marker position={position}
                    icon={customIcon}
                    >
                        <Popup>
                            Popup test
                        </Popup>
                    </Marker> */}
                        <Markers events={events} />
                    </MapContainer>
                </div>
            </div>
        ),
        [],
    );

    const bounds = getBounds(events);

    const setBounds = useCallback(

        () => (map ? map.fitBounds(bounds) : null),

        // () => (map && bounds.length ? map.fitBounds(bounds) : console.log('no bounds')),
        // () => console.log(bounds.length ? true : false),
        [map, events]
    );

    setBounds();

    try {
        return (
            <div>
                {map ? <ResetSize map={map} /> : null}
                {displayMap}
            </div>
        )
    } catch (error) {
        console.log(error);
        return (<div>Map unavailable</div>);
    }
}

export default Map