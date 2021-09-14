import { useState, useEffect } from 'react';

const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { latitude: "", longitude: "" }
    });


    return location;
}

export default useGeoLocation;