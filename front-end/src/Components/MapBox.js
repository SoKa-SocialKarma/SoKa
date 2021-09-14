import { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import useGeoLocation from '../Hooks/useGeoLocation';

const MapBox = () => {
    const location = useGeoLocation();
    const [viewport, setViewport] = useState({
        latitude: location.coordinates.latitude || 40.7128,
        longitude: location.coordinates.longitude || -74.0060,
        zoom: 13,
        width: window.innerWidth,
        height: window.innerHeight
    })

    useEffect(() => {
        // When the location changes, I want to set the viewport to my current location
        setViewport({
            latitude: location.coordinates.latitude || 40.7128,
            longitude: location.coordinates.longitude || -74.0060,
            zoom: 12,
            width: window.innerWidth,
            height: window.innerHeight
        })
    }, [location])
    return (
        <div>
            <h1>Mappppp</h1>
        </div>
    )
}

export default MapBox;