// SB LiveMap.jsx
import { useState } from 'react'
import ActivityTimeline from './ActivityTimeline'
import ArcGISMap from './MapView'
import '../styles/LiveMap.css'

function LiveMap({ events, selectedEvent: selectedEventFromApp, isSideCollapsed }) {
  const [isMapCollapsed, setIsMapCollapsed] = useState(false)
  const [isLegendCollapsed, setIsLegendCollapsed] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)

  const stats = [
    { label: 'Total Events', value: 12, icon: '🚨', color: 'var(--secondary-gradient)' },
    { label: 'Active Events', value: 8, icon: '🚒', color: 'var(--success-gradient)' },
    { label: 'Closed Events', value: 4, icon: '⚠️', color: 'var(--warning-gradient)' },
  ]

  const handleEventClick = (event) => {
    setSelectedEvent(event)
  }

  const closeEventDetails = () => {
    setSelectedEvent(null)
  }

  return (
    <main className={`live-map-container ${isSideCollapsed ? "map-hidden" : ""}`}>
      <div className={`map-section ${isSideCollapsed ? "hide-map" : ""}`}>
        <div className="map-header">
          <div className="map-title-group">
            <h2 className="map-title">Live Map</h2>
            <span className="live-indicator">
              <span className="pulse-dot"></span>
              Live
            </span>
          </div>

          <div className="map-controls">
            <div className="map-layers">
              <span className="layer-badge">Traffic</span>
              <span className="layer-badge">Weather</span>
              <span className="layer-badge">Resources</span>
            </div>
            <button
              className="collapse-toggle"
              onClick={() => setIsMapCollapsed(!isMapCollapsed)}
              title={isMapCollapsed ? "Expand Map" : "Collapse Map"}
            >
              {isMapCollapsed ? "▼" : "▲"}
            </button>
          </div>
        </div>

        {!isMapCollapsed && (
          <div className={`map-wrapper ${isSideCollapsed ? "side-collapsed" : ""} ${isMapCollapsed ? "collapsed" : ""}`}>
            <ArcGISMap
              events={events}
              selectedEvent={selectedEventFromApp}
              onEventClick={handleEventClick}
            />

            <div className={`map-legend ${isLegendCollapsed ? 'collapsed' : ''}`}>
              <div className="legend-header">
                <h4 className="legend-title">Event Severity</h4>
                <button
                  className="legend-toggle"
                  onClick={() => setIsLegendCollapsed(!isLegendCollapsed)}
                  title={isLegendCollapsed ? "Expand Legend" : "Collapse Legend"}
                >
                  {isLegendCollapsed ? '▶' : '▼'}
                </button>
              </div>

              {!isLegendCollapsed && (
                <div className="legend-items">
                  <div className="legend-item">
                    <span className="legend-color critical"></span>
                    <span className="legend-label">Critical</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color high"></span>
                    <span className="legend-label">High</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color medium"></span>
                    <span className="legend-label">Medium</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-color low"></span>
                    <span className="legend-label">Low</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="stats-row">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" style={{ '--card-gradient': stat.color }}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-content">
                <p className="stat-label">{stat.label}</p>
                <p className="stat-value">{stat.value}</p>
              </div>
              <div className="stat-trend">↑ 12%</div>
            </div>
          ))}
        </div>
      </div>

      <ActivityTimeline />

      {selectedEvent && (
        <div className="event-details-overlay" onClick={closeEventDetails}>
          <div
            className="event-details-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="event-details-header">
              <h3 className="event-details-title">{selectedEvent.title}</h3>
              <button className="close-button" onClick={closeEventDetails}>✕</button>
            </div>

            <div className="event-details-content">
              <div className="event-detail-row">
                <span className="detail-label">Severity:</span>
                <span className={`severity-badge severity-${selectedEvent.severity}`}>
                  {selectedEvent.severity}
                </span>
              </div>
              <div className="event-detail-row">
                <span className="detail-label">Location:</span>
                <span className="detail-value">
                  {selectedEvent.coords[1].toFixed(4)}, {selectedEvent.coords[0].toFixed(4)}
                </span>
              </div>
              <div className="event-detail-row">
                <span className="detail-label">Status:</span>
                <span className="detail-value">Active</span>
              </div>
              <div className="event-detail-row">
                <span className="detail-label">Reported:</span>
                <span className="detail-value">2 hours ago</span>
              </div>
              <div className="event-detail-row">
                <span className="detail-label">Description:</span>
                <p className="detail-description">
                  Emergency response units have been dispatched to the location.
                  Situation is being monitored in real-time.
                </p>
              </div>
            </div>

            <div className="event-details-footer">
              <button className="action-button primary">Assign Resources</button>
              <button className="action-button secondary">View History</button>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default LiveMap
