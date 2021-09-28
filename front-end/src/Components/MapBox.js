import { useState, useEffect } from 'react'
import { useElement } from '../Context/AuthContext'
import useGeoLocation from '../Hooks/useGeoLocation'
import ReactMapGL, { Source, Layer } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const layerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 100,
    'circle-color': 'rgba(162, 101, 236, 0.4)'
  }
}

const MapBox = ({ adjustmentHeight, adjustmentWidth }) => {
  const location = useGeoLocation()
  const currentLong = Number(location.coordinates.longitude)
  const currentLat = Number(location.coordinates.latitude)
  const { mainElement } = useElement()

  const [viewport, setViewport] = useState({
    latitude: location.coordinates.latitude || 40.7128,
    longitude: location.coordinates.longitude || -74.006,
    zoom: 12,
    width: adjustmentWidth ? (mainElement.width - adjustmentWidth) : mainElement.width,
    height: adjustmentHeight ? (mainElement.height - adjustmentHeight) : mainElement.height

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
      width: adjustmentWidth ? (mainElement.width - adjustmentWidth) : mainElement.width,
      height: adjustmentHeight ? (mainElement.height - adjustmentHeight) : mainElement.height
    })
    mainElement.element && mainElement.element.scrollTo({ top: 20, behavior: 'smooth' })
  }, [location, mainElement, adjustmentWidth, adjustmentHeight])


  return (
    <>
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle='mapbox://styles/tpichardo/cktjfw1vh05kc18qq97wjjwrj'
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        style={{ height: '50px', width: '30px' }}
      >
        <Source id='my-data' type='geojson' data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </ReactMapGL>
    </>
  )
}

export default MapBox
