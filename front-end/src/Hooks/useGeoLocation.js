import { useState, useEffect } from 'react';

const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { latitude: "", longitude: "" }
    });
    const onSuccess = location => {
        console.log(location)
        setLocation({
            loaded: true,
            coordinates: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            },
        });
    };

    return location;
}

export default useGeoLocation;