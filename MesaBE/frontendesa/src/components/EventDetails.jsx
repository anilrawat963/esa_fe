import { useState } from "react";
import "../styles/EventDetails.css"; // optional but index.css contains base styles

function EventDetails({ event, isSideCollapsed, setIsSideCollapsed }) {
  // call hooks unconditionally
  const [collapsed, setCollapsed] = useState(false);
  const [notes, setNotes] = useState("");

  if (!event) {
    return (
      <aside className="event-details">
        <h3>No event selected</h3>
        <p className="small-muted">Select an event from the left to view details.</p>
      </aside>
    );
  }

  const resources = [
    { name: "Ambulance", count: 3 },
    { name: "Fire Trucks", count: 2 },
    { name: "Rescue Teams", count: 4 },
  ];
  const quickActions = ["Send Alert to Public","Open Incident Report","Export Snapshot"];
  const infoCards = [
    { title: "Event Type", value: event.eventType || "Incident", icon: "🚧" },
    { title: "People Affected", value: event.peopleAffected || "N/A", icon: "🧍" },
    { title: "Response ETA", value: event.eta || "N/A", icon: "⏱️" },
    { title: "Priority Level", value: event.severity || "N/A", icon: "🔺" },
  ];

  return (
    <aside className={`event-details ${collapsed ? "collapsed-panel" : ""} ${isSideCollapsed ? "expanded-panel" : ""}`}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div>
          <h2 className="event-title">{event.eventTitle || event.name}</h2>
          <div style={{color:"#64748b", fontSize:13}}>{event.eventID || event.id} • {event.location_text || event.location}</div>
        </div>
        <div>
          <button className="btn" onClick={()=>setIsSideCollapsed(!isSideCollapsed)}>{isSideCollapsed ? "Expand Map" : "Collapse Map"}</button>
        </div>
      </div>

      <p className="event-full-description">{event.description || event.summary}</p>

      <div style={{display:"flex", gap:8, marginTop:12}}>
        <button className="btn btn-primary">Assign Resource</button>
        <button className="btn">Escalate</button>
      </div>

      <div style={{marginTop:16}}>
        <div style={{display:"flex", gap:12, flexWrap:"wrap"}}>
          {infoCards.map((c,i)=>(
            <div key={i} style={{background:"#fff", padding:12, borderRadius:10, minWidth:140, boxShadow:"0 4px 18px rgba(15,23,42,0.05)"}}>
              <div style={{fontSize:18}}>{c.icon}</div>
              <div style={{fontWeight:700, marginTop:6}}>{c.title}</div>
              <div style={{color:"#64748b"}}>{c.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{marginTop:16}}>
        <label className="label">Quick Notes</label>
        <textarea className="input" rows={4} value={notes} onChange={(e)=>setNotes(e.target.value)} placeholder="Add internal notes..."></textarea>
      </div>

      <div style={{marginTop:12}}>
        <h4>Resources</h4>
        {resources.map((r,i)=>(<div key={i} style={{display:"flex",justifyContent:"space-between", padding:"6px 0"}}><div>{r.name}</div><div>{r.count}</div></div>))}
      </div>

      <div style={{marginTop:12}}>
        <h4>Quick Actions</h4>
        <div style={{display:"flex",gap:8}}>
          {quickActions.map((a,i)=>(<button key={i} className="btn">{a}</button>))}
        </div>
      </div>
    </aside>
  );
}

export default EventDetails;
