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

const MapBox = ({adjustmentWidth, adjustmentHeight}) => {
  const location = useGeoLocation()
  const currentLong = Number(location.coordinates.longitude)
  const currentLat = Number(location.coordinates.latitude)
  const { element } = useElement()

  const [viewport, setViewport] = useState({
    latitude: location.coordinates.latitude || 40.7128,
    longitude: location.coordinates.longitude || -74.006,
    zoom: 12,
    // width: mainElement?.clientWidth - 170,
    // height: mainElement?.clientHeight - 300
    // width: element?.clientWidth,
    // height: element?.clientHeight - 94 || 0
    width: element?.clientWidth - adjustmentWidth || 0,
    height: element?.clientHeight - adjustmentHeight || 0
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
      width: element?.clientWidth - 500 || 0,
      height: element?.clientHeight - 100 || 0
    })
    element && element.scrollTo({ top: 20, behavior: 'smooth' })
  }, [location, element])

  return (
    <>
      <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle='mapbox://styles/tpichardo/cktjfw1vh05kc18qq97wjjwrj'
        {...viewport}
        onViewportChange={nextViewport => setViewport(nextViewport)}
        style={{ height: "50px", width: "30px" }}
      >
        <Source id='my-data' type='geojson' data={geojson}>
          <Layer {...layerStyle} />
        </Source>
      </ReactMapGL>
    </>
  )
}

export default MapBox
