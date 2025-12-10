// Dashboard.jsx
import { useState } from 'react'

import Header from './components/Header'
import EventsSidebar from './components/EventsSidebar'
import LiveMap from './components/LiveMap'
import EventDetails from './components/EventDetails'
import CreateEventModal from './components/CreateEventModal'

import './App.css'

function Dashboard() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const [isSideCollapsed, setIsSideCollapsed] = useState(false)

  const [events, setEvents] = useState([
    {
      id: 'EVT-1001',
      name: 'Collapsed Bridge',
      severity: 'Critical',
      location: 'Sector 7, Riverside',
      datetime: '20/11/2025, 3:52:00 pm',
      assignedTo: 'Group 1',
      description: 'Bridge collapse reported; multiple vehicles involved...',
      coords: [-118.244, 34.052],
    },
    {
      id: 'EVT-1002',
      name: 'Power Outage',
      severity: 'High',
      location: 'Downtown Grid 3',
      datetime: '20/11/2025, 1:30:00 pm',
      assignedTo: 'Unassigned',
      description: 'Large area affected due to substation fault; crews investigating.',
      coords: [-118.300, 34.080],
    },
    {
      id: 'EVT-1003',
      name: 'Traffic Accident',
      severity: 'Medium',
      location: 'Highway 101, Exit 45',
      datetime: '21/11/2025, 9:15:00 am',
      assignedTo: 'Group 2',
      description: 'Multi-vehicle collision causing traffic delays; emergency services on site.',
      coords: [-118.190, 34.020],
    },
    {
      id: 'EVT-1004',
      name: 'Water Pipe Leak',
      severity: 'Low',
      location: 'Park Avenue, Block C',
      datetime: '21/11/2025, 7:45:00 am',
      assignedTo: 'Group 4',
      description: 'Minor water leak reported; maintenance team dispatched for repair.',
      coords: [-118.260, 34.065],
    },
  ])

  const handleCreateEvent = (newEvent) => {
    setEvents([newEvent, ...events])
  }

  const filteredEvents = events.filter(event => {
    if (!searchQuery) return true

    const query = searchQuery.toLowerCase()
    return (
      event.name?.toLowerCase().includes(query) ||
      event.id?.toLowerCase().includes(query) ||
      event.location?.toLowerCase().includes(query) ||
      event.description?.toLowerCase().includes(query) ||
      event.severity?.toLowerCase().includes(query)
    )
  })

  return (
    <div className="app">
      <Header
        onNewEvent={() => setIsCreateModalOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className={`dashboard-container ${isSideCollapsed ? 'map-hidden' : ''}`}>

        <EventsSidebar
          events={filteredEvents}
          selectedEvent={selectedEvent}
          onSelectEvent={setSelectedEvent}
        />

        <LiveMap
          events={filteredEvents}
          selectedEvent={selectedEvent}
          isSideCollapsed={isSideCollapsed}
        />

        <EventDetails
          event={selectedEvent || events[0]}
          isSideCollapsed={isSideCollapsed}
          setIsSideCollapsed={setIsSideCollapsed}
        />

      </div>

      {isCreateModalOpen && (
        <CreateEventModal
          onClose={() => setIsCreateModalOpen(false)}
          onCreateEvent={handleCreateEvent}
        />
      )}
    </div>
  )
}

export default Dashboard
