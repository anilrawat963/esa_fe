import { useEffect, useRef } from 'react'
import MapView from '@arcgis/core/views/MapView'
import Map from '@arcgis/core/Map'
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer'
import Graphic from '@arcgis/core/Graphic'
import Point from '@arcgis/core/geometry/Point'
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol'
import TextSymbol from '@arcgis/core/symbols/TextSymbol'
import '@arcgis/core/assets/esri/themes/light/main.css'
import '../styles/MapView.css'

function ArcGISMap({ events = [], selectedEvent, onEventClick }) {
  const mapDiv = useRef(null)
  const viewRef = useRef(null)
  const graphicsLayerRef = useRef(null)

  // Helper function to get color based on severity
  const getSeverityColor = (severity) => {
    const severityLower = severity.toLowerCase()
    switch (severityLower) {
      case 'critical':
        return [220, 38, 38]
      case 'high':
        return [249, 115, 22]
      case 'medium':
        return [234, 179, 8]
      case 'low':
        return [16, 185, 129]
      default:
        return [156, 163, 175]
    }
  }

  // Initialize map view once
  useEffect(() => {
    if (!mapDiv.current || viewRef.current) return

    const map = new Map({
      basemap: 'streets-vector'
    })

    const view = new MapView({
      container: mapDiv.current,
      map: map,
      center: [-118.244, 34.052],
      zoom: 11,
      popup: {
        autoOpenEnabled: false
      },
      ui: {
        components: ['zoom']
      }
    })

    viewRef.current = view

    const graphicsLayer = new GraphicsLayer()
    graphicsLayerRef.current = graphicsLayer
    map.add(graphicsLayer)

    // Add click handler for markers when view is ready
    view.when(() => {
      view.on('click', (event) => {
        view.hitTest(event).then((response) => {
          if (response.results.length > 0) {
            const graphic = response.results[0].graphic
            if (graphic.attributes && onEventClick) {
              onEventClick({
                title: graphic.attributes.title,
                severity: graphic.attributes.severity,
                coords: graphic.attributes.coords
              })
            }
          }
        })
      })
    }).catch((error) => {
      console.error('MapView initialization error:', error)
    })

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy()
        viewRef.current = null
      }
    }
  }, [])

  // Update markers when events change
  useEffect(() => {
    if (!graphicsLayerRef.current) return

    // Clear existing markers
    graphicsLayerRef.current.removeAll()

    // Add new markers
    events.forEach(event => {
      if (!event.coords) return

      const point = new Point({
        longitude: event.coords[0],
        latitude: event.coords[1]
      })

      const markerSymbol = new SimpleMarkerSymbol({
        color: getSeverityColor(event.severity),
        size: '14px',
        outline: {
          color: [255, 255, 255],
          width: 2
        }
      })

      const pointGraphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
        attributes: {
          title: event.name,
          severity: event.severity,
          coords: event.coords
        }
      })

      // Create text label above the marker
      const textSymbol = new TextSymbol({
        text: event.name,
        color: 'white',
        haloColor: getSeverityColor(event.severity),
        haloSize: '2px',
        xoffset: 0,
        yoffset: -20,
        font: {
          size: 11,
          family: 'sans-serif',
          weight: 'bold'
        }
      })

      const textGraphic = new Graphic({
        geometry: point,
        symbol: textSymbol
      })

      graphicsLayerRef.current.add(pointGraphic)
      graphicsLayerRef.current.add(textGraphic)
    })
  }, [events])

  // Zoom to selected event when it changes
  useEffect(() => {
    if (!viewRef.current || !selectedEvent || !selectedEvent.coords) return

    const [longitude, latitude] = selectedEvent.coords
    const view = viewRef.current

    // Wait for view to be ready before zooming
    view.when(() => {
      view.goTo({
        center: [longitude, latitude],
        zoom: 16
      }, {
        duration: 1500,
        easing: 'ease-in-out'
      }).catch((error) => {
        // Ignore "AbortError" which happens when user interacts during animation
        if (error.name !== 'AbortError') {
          console.error('Error zooming to event:', error)
        }
      })
    }).catch((error) => {
      console.error('View not ready:', error)
    })
  }, [selectedEvent])

  return <div className="map-container" ref={mapDiv}></div>
}

export default ArcGISMap
