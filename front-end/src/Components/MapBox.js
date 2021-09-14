import { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
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
        <>
            <ReactMapGL
                mapboxApiAccessToken="pk.eyJ1IjoidHBpY2hhcmRvIiwiYSI6ImNrdGkzZmtpczAzYzYyb2w1MnRjcWFkdGoifQ.AfSFO49iduml_uiIy3JHNg"
                mapStyle="mapbox://styles/tpichardo/cktjfw1vh05kc18qq97wjjwrj"
                {...viewport}
                onViewportChange={nextViewport => setViewport(nextViewport)}

            >
                <Marker
                    latitude={location.coordinates.latitude || 40.7128}
                    longitude={location.coordinates.longitude || -74.0060}
                >
                    <button>
                        <img src="https://www.clipartmax.com/png/middle/191-1917225_dumbbell-icon-white-dumbbell-png.png" height={15} width={15} alt="Dumbell icon" />
                    </button>
                </Marker>
            </ReactMapGL>
        </>
    )
}

export default MapBox;