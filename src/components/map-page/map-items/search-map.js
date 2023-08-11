// --- (1), (2) & (3): install and import ---
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Markers from './markers';

// -----------------------------------------------------

function Map() {
    // Berlin coordinates
    // const position = [52.51, 13.38];
    // denver -> update to be dynamically centerred
    const position = ["39.742043", "-104.991531"];

    return (
        <div className='map-component'>
            {/* --- (5) Add leaflet map container --- */}
            <div className='map'>
                <MapContainer center={position} zoom={6} scrollWheelZoom={false}>
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
                    <Markers />
                </MapContainer>
            </div>
        </div>
    );
}

export default Map