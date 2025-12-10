import { useState, useEffect } from "react";
import Header from "./components/Header";
import EventsSidebar from "./components/EventsSidebar";
import LiveMap from "./components/LiveMap";
import EventDetails from "./components/EventDetails";
import CreateEventModal from "./components/CreateEventModal";
import { getUser, getRole, getGroup, authFetch } from "./utils/auth";

export default function Dashboard(){
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSideCollapsed, setIsSideCollapsed] = useState(false);
  const [events, setEvents] = useState([]);

  const loadEvents = async () => {
    try {
      // call backend to get events for this user/role/group
      const res = await authFetch(`/api/events`); // backend should honor role
      if (!res.ok) {
        console.error("Failed to load events");
        return;
      }
      const list = await res.json();
      setEvents(list);
      if (!selectedEvent && list.length) setSelectedEvent(list[0]);
    } catch (e) { console.error(e); }
  };

  useEffect(()=>{ loadEvents(); }, []);

  const handleCreateEvent = (newEvent) => {
    // optimistic add (backend will return created event)
    setEvents([newEvent, ...events]);
    setIsCreateModalOpen(false);
  };

  const filtered = events.filter(ev => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (ev.eventTitle?.toLowerCase().includes(q) || ev.eventID?.toString()?.includes(q) || ev.location_text?.toLowerCase().includes(q));
  });

  return (
    <div className="app">
      <Header onNewEvent={()=>setIsCreateModalOpen(true)} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <div className={`dashboard-container ${isSideCollapsed ? "map-hidden" : ""}`}>
        <EventsSidebar events={filtered} selectedEvent={selectedEvent} onSelectEvent={setSelectedEvent} />
        <LiveMap events={filtered} selectedEvent={selectedEvent} isSideCollapsed={isSideCollapsed} />
        <EventDetails event={selectedEvent || null} isSideCollapsed={isSideCollapsed} setIsSideCollapsed={setIsSideCollapsed} />
      </div>

      {isCreateModalOpen && <CreateEventModal onClose={()=>setIsCreateModalOpen(false)} onCreateEvent={handleCreateEvent} />}
    </div>
  );
}
