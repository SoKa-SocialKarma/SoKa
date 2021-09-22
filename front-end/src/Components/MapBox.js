import { useState, useEffect } from 'react'
import ReactMapGL, { Source, Layer } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import useGeoLocation from '../Hooks/useGeoLocation'

const layerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 100,
    'circle-color': 'rgba(22, 134, 182, 0.3)'
  }
}

const MapBox = () => {
  const location = useGeoLocation()
  const currentLong = Number(location.coordinates.longitude)
  const currentLat = Number(location.coordinates.latitude)

  const [viewport, setViewport] = useState({
    latitude: location.coordinates.latitude || 40.7128,
    longitude: location.coordinates.longitude || -74.006,
    zoom: 13,
    width: window.innerWidth,
    height: window.innerHeight
  })

  const geojson = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [currentLong.toFixed(2), currentLat]
        }
      }
    ]
  }

  useEffect(() => {
    // When the location changes, I want to set the viewport to my current location
    setViewport({
      latitude: location.coordinates.latitude || 40.7128,
      longitude: location.coordinates.longitude || -74.006,
      zoom: 12,
      width: window.innerWidth,
      height: window.innerHeight
    })
  }, [location])

  return (
    <>
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle='mapbox://styles/tpichardo/cktjfw1vh05kc18qq97wjjwrj'
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
      >
        <Source id='my-data' type='geojson' data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </ReactMapGL>
    </>
  )
}

export default MapBox
