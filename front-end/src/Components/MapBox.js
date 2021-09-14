import { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useGeoLocation from '../Hooks/useGeoLocation';

const MapBox = () => {
    const location = useGeoLocation();
    const [viewport, setviewport] = useState({
        latitude: location.coordinates.latitude || 40.7128,
        longitude: location.coordinates.longitude || -74.0060,
        zoom: 13,
        width: window.innerWidth,
        height: window.innerHeight
    })
    return (
        <div>
            <h1>Mappppp</h1>
        </div>
    )
}

export default MapBox;