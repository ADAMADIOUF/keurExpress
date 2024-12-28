import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN

const Map = ({ city, address, title, mapUrl }) => {
  const mapContainerRef = useRef(null)
  const mapRef = useRef(null)
  const [coordinates, setCoordinates] = useState([14.6928, -17.4467]) // Default to Dakar

  // Function to fetch coordinates based on city and address
  const fetchCoordinates = async () => {
    if (city && address) {
      const geocodeUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address + ', ' + city
      )}.json?access_token=${mapboxgl.accessToken}`

      try {
        const response = await fetch(geocodeUrl)
        const data = await response.json()
        const { features } = data
        if (features && features.length > 0) {
          const [lng, lat] = features[0].geometry.coordinates
          setCoordinates([lng, lat])
        }
      } catch (error) {
        console.error('Error fetching coordinates:', error)
      }
    }
  }

  useEffect(() => {
    fetchCoordinates()
  }, [city, address])

  useEffect(() => {
    if (!mapRef.current && mapContainerRef.current) {
      const map = new mapboxgl.Map({
        container: mapContainerRef.current, // div reference for the map
        style: 'mapbox://styles/mapbox/streets-v11',
        center: coordinates,
        zoom: 10,
        attributionControl: false, // Disable attribution control
      })

      // Add marker
      const marker = new mapboxgl.Marker().setLngLat(coordinates).addTo(map)

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
  }, [coordinates, title])

  return (
    <div>
      {mapUrl ? (
        <a href={mapUrl} target='_blank' rel='noopener noreferrer'>
          View map in full screen
        </a>
      ) : null}
      <div
        ref={mapContainerRef}
        style={{ width: '100%', height: '300px' }}
      ></div>
    </div>
  )
}

export default Map
