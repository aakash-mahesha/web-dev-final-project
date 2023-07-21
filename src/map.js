import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; // Import the Mapbox CSS

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Initialize the map only once when the component mounts
    mapboxgl.accessToken = 'pk.eyJ1IjoiYWttMjgwNSIsImEiOiJjbGtiZmF6c24wZTBlM3JycDk3Y2YzczMyIn0.MElryZlog6QTQZtCk-je6A';
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/outdoors-v12', // Use your preferred map style
      center: [-70.9, 42.35], // Set the initial map center
      zoom: 9, // Set the initial zoom level
    });

    // Clean up the map instance when the component unmounts
    return () => map.remove();
  }, []);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '500px' }} />;
};

export default Map;

