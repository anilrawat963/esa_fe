import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EventPage(){
  const { id } = useParams();
  const { state: event } = useLocation();
  const nav = useNavigate();

  const [description, setDescription] = useState(event?.description || "");
  const [summary, setSummary] = useState(event?.summary || "");

  const taskId = `TSK-${String(id).slice(-3)}`;

  return (
    <div style={{padding:20}}>
      <div style={{display:"flex", gap:24}}>
        <div style={{flex:1}}>
          <h1>{event?.eventTitle || event?.name || "Event Details"}</h1>
          <div style={{marginTop:8}}><strong>Event ID:</strong> {id}</div>
          <div style={{marginTop:8}}><strong>Location:</strong> {event?.location_text || event?.location}</div>
          <div style={{marginTop:8}}><strong>Date:</strong> {event?.event_date || event?.datetime}</div>

          <h3 style={{marginTop:16}}>Description</h3>
          <textarea className="input" rows={4} value={description} onChange={(e)=>setDescription(e.target.value)} />

          <h3 style={{marginTop:12}}>Summary</h3>
          <textarea className="input" rows={3} value={summary} onChange={(e)=>setSummary(e.target.value)} />

          <div style={{marginTop:12}}>
            <div><strong>Task ID:</strong> {taskId}</div>
            <div style={{marginTop:8}}><strong>Status:</strong> Open</div>
            <button className="btn btn-primary" style={{marginTop:12}} onClick={()=>nav(`/task/${taskId}`, { state: { event, taskId }})}>Open Task</button>
          </div>
        </div>

        <div style={{width:420}}>
          <iframe className="map-iframe" title="map" src={`https://www.google.com/maps?q=${event?.latitude || event?.coords?.[0] || 20.5937},${event?.longitude || event?.coords?.[1] || 78.9629}&z=10&output=embed`}></iframe>
        </div>
      </div>
    </div>
  );
}
