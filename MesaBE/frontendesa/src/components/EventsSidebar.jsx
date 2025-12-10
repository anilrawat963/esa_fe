import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EventsSidebar({ events = [], selectedEvent, onSelectEvent }) {
  const navigate = useNavigate();
  const [filter,setFilter]=useState("All");
  const [dateFilter,setDateFilter]=useState("All Time");
  const [showCustomDatePicker,setShowCustomDatePicker]=useState(false);
  const [customStartDate,setCustomStartDate]=useState("");
  const [customEndDate,setCustomEndDate]=useState("");

  const parseEventDate = (dstr)=>{
    try{
      // dstr could be '2025-12-01' or '20/11/2025,...' handle common patterns
      if(!dstr) return new Date();
      if(dstr.includes('/')){
        const [datePart] = dstr.split(',');
        const [day,month,year] = datePart.split('/');
        return new Date(year, month-1, day);
      }
      return new Date(dstr);
    }catch(e){ return new Date(); }
  };

  const getDateRange = ()=>{
    const now = new Date(); const today = new Date(now.getFullYear(),now.getMonth(),now.getDate());
    switch(dateFilter){
      case 'All Time': return null;
      case 'Today': return {start:today, end:new Date(today.getTime()+86400000)};
      case 'Yesterday': return {start:new Date(today.getTime()-86400000), end:today};
      case 'Last 3 Days': return {start:new Date(today.getTime()-3*86400000), end:new Date(today.getTime()+86400000)};
      case 'Last 1 Week': return {start:new Date(today.getTime()-7*86400000), end:new Date(today.getTime()+86400000)};
      case 'Last 30 Days': return {start:new Date(today.getTime()-30*86400000), end:new Date(today.getTime()+86400000)};
      case 'Custom': if(customStartDate && customEndDate) return {start:new Date(customStartDate), end:new Date(new Date(customEndDate).getTime()+86400000)}; return null;
      default: return null;
    }
  };

  const filterBySeverity = (e)=> filter==='All' ? true : (e.severity?.toLowerCase() === filter.toLowerCase());
  const filterByDate = (e)=>{
    const range = getDateRange(); if(!range) return true;
    const ed = parseEventDate(e.event_date || e.datetime || e.eventDate);
    return ed >= range.start && ed < range.end;
  };

  const filtered = events.filter(ev => filterBySeverity(ev) && filterByDate(ev));

  return (
    <aside className="events-sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Events</h2>
        <span className="event-count">{filtered.length} shown</span>
      </div>

      <div className="filters" style={{display:"flex",gap:8, marginBottom:10}}>
        <select className="input" value={filter} onChange={(e)=>setFilter(e.target.value)}>
          <option>All</option><option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
        </select>
        <select className="input" value={dateFilter} onChange={(e)=>{ setDateFilter(e.target.value); setShowCustomDatePicker(e.target.value==='Custom'); }}>
          <option>All Time</option><option>Today</option><option>Yesterday</option><option>Last 3 Days</option><option>Last 1 Week</option><option>Last 30 Days</option><option>Custom</option>
        </select>
      </div>

      {showCustomDatePicker && (
        <div style={{marginBottom:10}}>
          <input type="date" className="input" value={customStartDate} onChange={e=>setCustomStartDate(e.target.value)} />
          <input type="date" className="input" value={customEndDate} onChange={e=>setCustomEndDate(e.target.value)} />
        </div>
      )}

      <div className="events-list">
        {filtered.length === 0 ? (
          <div className="no-events"><p>No events match the current filters</p></div>
        ) : (
          filtered.map(ev => (
            <div key={ev.eventID || ev.id} className={`event-card ${selectedEvent?.eventID===ev.eventID ? 'selected':''}`}
                 onClick={()=>onSelectEvent(ev)}>
              <div className="event-card-header">
                <h3 className="event-name">{ev.eventTitle || ev.name}</h3>
                <span className={`severity-badge ${(ev.severity||'low').toLowerCase()}`}>{ev.severity}</span>
              </div>
              <div className="event-meta">
                <span className="event-id">{ev.eventID || ev.id}</span>
              </div>
              <div className="event-info">
                <p className="event-location">{ev.location_text || ev.location}</p>
                <p className="event-datetime">{ev.event_date || ev.datetime}</p>
                <p className="event-assigned">Assigned: {ev.assigned_to_groups || ev.assignedTo}</p>
              </div>
              <p className="event-description">{ev.summary || ev.description}</p>

              <div style={{display:"flex", gap:8, marginTop:8}}>
                <button className="btn btn-primary" onClick={(e)=>{ e.stopPropagation(); navigate(`/event/${ev.eventID || ev.id}`, { state: ev }); }}>View Event</button>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
}
