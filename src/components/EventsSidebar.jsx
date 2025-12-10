import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import '../styles/EventsSidebar.css'

function EventsSidebar({ events, selectedEvent, onSelectEvent }) {
  const navigate = useNavigate();

  const [filter, setFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('All Time')
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false)
  const [customStartDate, setCustomStartDate] = useState('')
  const [customEndDate, setCustomEndDate] = useState('')

  const handleDateFilterChange = (e) => {
    const value = e.target.value
    setDateFilter(value)
    setShowCustomDatePicker(value === 'Custom')
  }

  const parseEventDate = (datetimeStr) => {
    const [datePart] = datetimeStr.split(',')
    const [day, month, year] = datePart.split('/')
    return new Date(year, month - 1, day)
  }

  const getDateRange = () => {
    const now = new Date()
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    switch (dateFilter) {
      case 'All Time':
        return null
      case 'Today':
        return { start: today, end: new Date(today.getTime() + 86400000) }
      case 'Yesterday':
        return { start: new Date(today.getTime() - 86400000), end: today }
      case 'Last 3 Days':
        return { start: new Date(today.getTime() - 3 * 86400000), end: new Date(today.getTime() + 86400000) }
      case 'Last 1 Week':
        return { start: new Date(today.getTime() - 7 * 86400000), end: new Date(today.getTime() + 86400000) }
      case 'Last 30 Days':
        return { start: new Date(today.getTime() - 30 * 86400000), end: new Date(today.getTime() + 86400000) }
      case 'Custom':
        if (customStartDate && customEndDate) {
          return {
            start: new Date(customStartDate),
            end: new Date(new Date(customEndDate).getTime() + 86400000)
          }
        }
        return null
      default:
        return null
    }
  }

  const filterBySeverity = (event) => {
    if (filter === 'All') return true
    return event.severity === filter
  }

  const filterByDate = (event) => {
    const dateRange = getDateRange()
    if (!dateRange) return true

    const eventDate = parseEventDate(event.datetime)
    return eventDate >= dateRange.start && eventDate < dateRange.end
  }

  const filteredEvents = events.filter(event => {
    return filterBySeverity(event) && filterByDate(event)
  })

  return (
    <aside className="events-sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Events</h2>
        <span className="event-count">{filteredEvents.length} shown</span>
      </div>

      <div className="filters">
        <select
          className="filter-select"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          <option>Critical</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select
          className="filter-select date-filter"
          value={dateFilter}
          onChange={handleDateFilterChange}
        >
          <option>All Time</option>
          <option>Today</option>
          <option>Yesterday</option>
          <option>Last 3 Days</option>
          <option>Last 1 Week</option>
          <option>Last 30 Days</option>
          <option>Custom</option>
        </select>
      </div>

      {showCustomDatePicker && (
        <div className="custom-date-range">
          <div className="date-input-group">
            <label htmlFor="start-date">Start Date</label>
            <input
              id="start-date"
              type="date"
              className="date-input"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e.target.value)}
            />
          </div>

          <div className="date-input-group">
            <label htmlFor="end-date">End Date</label>
            <input
              id="end-date"
              type="date"
              className="date-input"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e.target.value)}
            />
          </div>

          <button className="apply-date-filter">Apply</button>
        </div>
      )}

      <div className="events-list">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div
              key={event.id}
              className={`event-card ${selectedEvent?.id === event.id ? 'selected' : ''}`}
              onClick={() => onSelectEvent(event)}
            >
              <div className="event-card-header">
                <h3 className="event-name">{event.name}</h3>
                <span className={`severity-badge ${event.severity.toLowerCase()}`}>
                  {event.severity}
                </span>
              </div>

              <div className="event-meta">
                <span className="event-id">{event.id}</span>
              </div>

              <div className="event-info">
                <p className="event-location">{event.location}</p>
                <p className="event-datetime">{event.datetime}</p>
                <p className="event-assigned">Assigned: {event.assignedTo}</p>
              </div>

              <p className="event-description">{event.description}</p>

              {/* ⭐⭐ NEW BUTTON ADDED HERE ⭐⭐ */}
			  <button
			    className="view-event-btn"
			    onClick={(e) => {
			      e.stopPropagation();
			      navigate(`/event/${event.id}`, { state: event });
			    }}
			  >
			    View Event
			  </button>


            </div>
          ))
        ) : (
          <div className="no-events">
            <p>No events match the current filters</p>
          </div>
        )}
      </div>
    </aside>
  )
}

export default EventsSidebar
