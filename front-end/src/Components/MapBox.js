import { useState, useEffect } from 'react'
import { useAPI } from '../Context/AuthContext'

import { useElement } from '../Context/AuthContext'
import useGeoLocation from '../Hooks/useGeoLocation'
import ReactMapGL, { Source, Layer, Marker } from 'react-map-gl'
import axios from 'axios'
import { apiURL } from '../Util/apiURL.js'
import mapMarker from '../Assets/mapbox-marker.png'
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from "mapbox-gl"; // This is a dependency of react-map-gl even if you didn't explicitly install it
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require("worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker").default;



const layerStyle = {
  id: 'point',
  type: 'circle',
  paint: {
    'circle-radius': 100,
    'circle-color': 'rgba(162, 101, 236, 0.4)'
  }
}

const API = apiURL()

const MapBox = ({ adjustmentHeight, adjustmentWidth }) => {
  const { currentUserData } = useAPI()
  const location = useGeoLocation()
  const currentLong = Number(location.coordinates.longitude)
  const currentLat = Number(location.coordinates.latitude)
  const { mainElement } = useElement()
  const [userCoordinates, setUserCoordinates] = useState([])

  const getUserCoordinates = async () => {
    try {
      const { data } = await axios.get(`${API}/users`)
      setUserCoordinates(data)
    } catch (err) {
      console.log(err)
    }
  }

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
    //get user coordinates
    getUserCoordinates()
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
      {(window.location.pathname === `/search-results` ||
        window.location.pathname ===
        `/users/${currentUserData ? currentUserData.id : '14'
        }/profile` ||
        window.location.pathname ===
        `/users/${currentUserData ? currentUserData.id : '14'
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

      {window.location.pathname === `/map` && (
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
          {
            userCoordinates.map(coordinates => {
              return (
                <Marker
                  key={coordinates.id}
                  latitude={coordinates.coordinates.latitude}
                  longitude={coordinates.coordinates.longitude}
                >
                  <div>
                    <img src={mapMarker} alt="location marker on map" />
                  </div>
                </Marker>
              )
            })
          }
        </ReactMapGL>
      )}
    </>
  )
}

export default MapBox
