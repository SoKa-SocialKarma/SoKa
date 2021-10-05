import { useState, useEffect } from 'react'
import { useAPI } from '../Context/AuthContext'

import { useElement } from '../Context/AuthContext'
import { sokaURL } from '../Util/apiURL'
import useGeoLocation from '../Hooks/useGeoLocation'
import ReactMapGL, { Source, Layer, Marker } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
const API = sokaURL()

const layerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 100,
    'circle-color': 'rgba(162, 101, 236, 0.4)'
  }
}

const MapBox = ({ adjustmentHeight, adjustmentWidth }) => {
  const { currentUserData } = useAPI()
  const location = useGeoLocation()
  const currentLong = Number(location.coordinates.longitude)
  const currentLat = Number(location.coordinates.latitude)
  const { mainElement } = useElement()

  const [viewport, setViewport] = useState({
    latitude: location.coordinates.latitude || 40.7128,
    longitude: location.coordinates.longitude || -74.006,
    zoom: 12,
    width: adjustmentWidth
      ? mainElement.width - mainElement.width * adjustmentWidth
      : mainElement.width,
    height: adjustmentHeight
      ? mainElement.height - mainElement.height * adjustmentHeight
      : mainElement.height
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
      width: adjustmentWidth
        ? mainElement.width - mainElement.width * adjustmentWidth
        : mainElement.width,
      height: adjustmentHeight
        ? mainElement.height - mainElement.height * adjustmentHeight
        : mainElement.height
    })
    mainElement.element &&
      mainElement.element.scrollTo({ top: 20, behavior: 'smooth' })
  }, [location, mainElement, adjustmentWidth, adjustmentHeight])

  return (
    <>
      {(window.location.href === `${API}/search-results` ||
        window.location.href ===
          `${API}/users/${
            currentUserData ? currentUserData.id : '14'
          }/profile` ||
        window.location.href ===
          `${API}/users/${
            currentUserData ? currentUserData.id : '14'
          }/feed/matches`) && (
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
      )}

      {window.location.href === `${API}/map` && (
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
          <Marker key={1} latitude={40.7812} longitude={-73.9665}>
            <div>LOCATION</div>
          </Marker>
        </ReactMapGL>
      )}
    </>
  )
}

export default MapBox
