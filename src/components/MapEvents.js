import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// -----------------------------------------------------
function LocationMarker() {
    const [position, setPosition] = useState(null);
    const map = useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    });

    return (
        position == null ? null : (
            <Marker position={position}>
                <Popup>You are here</Popup>
            </Marker>
        )
    )
}


export function MapEvents() {
    // Berlin coordinates
    const position = [52.51, 13.38]

    return (
        <section className='map-component'>
            {/* --- (5) Add leaflet map container --- */}
            <div className='map'>
                <MapContainer center={position} zoom={6} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                    />
                    <LocationMarker />
                </MapContainer>
            </div>
        </section>
    )
}