import React, { useEffect, useRef } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const Map = ({ lng, lat, title }) => {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current, // div reference for the map
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: 10,
        attributionControl: false, // Disable attribution control
      })

      // Add marker
      const marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map)

      // Optionally add a popup to the marker
      const popup = new mapboxgl.Popup({ offset: 25 }).setText(title)
      marker.setPopup(popup)

      mapRef.current = map
    }

    // Clean up map instance on unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [lng, lat, title])

  return (
    <div ref={mapContainerRef} style={{ width: '100%', height: '300px' }}></div>
  )
}

export default Map
