import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { authFetch } from "../utils/auth";

export default function TaskPage(){
  const { taskId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const event = state?.event;
  const [taskDescription,setTaskDescription]=useState("");
  const [response,setResponse]=useState("");
  const [file,setFile]=useState(null);

  const handleSubmit = async ()=>{
    const formData = new FormData();
    formData.append("eventId", event?.eventID || event?.id || "");
    formData.append("taskId", taskId);
    formData.append("taskDescription", taskDescription);
    formData.append("response", response);
    if (file) formData.append("file", file);

    try{
      const res = await fetch("/api/tasks/respond", { method:"POST", body: formData, headers: { /* no json header for formData */ }});
      if(!res.ok) { alert(await res.text()); return; }
      alert("Task submitted");
      navigate(-1);
    }catch(e){ console.error(e); alert("Network error"); }
  };

  return (
    <div style={{padding:20}}>
      <button className="btn" onClick={()=>navigate(-1)}>← Back</button>
      <h1 style={{marginTop:12}}>Task: {taskId}</h1>
      <div style={{maxWidth:900, marginTop:12, background:"#fff", padding:16, borderRadius:10}}>
        <div style={{display:"flex", gap:12}}>
          <div style={{flex:1}}>
            <label className="label">Event ID</label>
            <div className="small-muted">{event?.eventID || event?.id}</div>
          </div>
          <div style={{flex:1}}>
            <label className="label">Task ID</label>
            <div className="small-muted">{taskId}</div>
          </div>
        </div>

        <div style={{marginTop:10}}>
          <label className="label">Task Description</label>
          <textarea className="input" rows={4} value={taskDescription} onChange={e=>setTaskDescription(e.target.value)} />
        </div>

        <div style={{marginTop:10}}>
          <label className="label">Response</label>
          <textarea className="input" rows={4} value={response} onChange={e=>setResponse(e.target.value)} />
        </div>

        <div style={{marginTop:10}}>
          <label className="label">Upload File</label>
          <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
        </div>

        <div style={{marginTop:12}}>
          <button className="btn btn-primary" onClick={handleSubmit}>Submit Task</button>
        </div>
      </div>
    </div>
  );
}
