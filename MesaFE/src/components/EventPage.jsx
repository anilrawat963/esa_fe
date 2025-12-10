import { useParams, useLocation, useNavigate } from "react-router-dom";
import "../styles/EventPage.css";
import { useState } from "react";

function EventPage() {
  const { id } = useParams();
  const { state: event } = useLocation();
  const navigate = useNavigate();

  const taskId = `TSK-${id.slice(-3)}`;

  // Editable Fields
  const [description, setDescription] = useState(event?.description || "");
  const [summary, setSummary] = useState(event?.summary || "");

  return (
    <div className="eventpage-container">

      {/* LEFT SIDE */}
      <div className="eventpage-left">

        <button className="back-btn" onClick={() => navigate(-1)}>
          &larr; Back
        </button>

        <div className="eventpage-header">
          <h1>{event?.name || "Event Details"}</h1>
          <span className={`severity-tag severity-${event?.severity?.toLowerCase()}`}>
            {event?.severity}
          </span>
        </div>

        {/* EVENT META */}
        <div className="eventpage-meta">
          <div className="meta-item">
            <label>Event ID</label>
            <p>{id}</p>
          </div>

          <div className="meta-item">
            <label>Location</label>
            <p>{event?.location}</p>
          </div>

          <div className="meta-item">
            <label>Date & Time</label>
            <p>{event?.datetime}</p>
          </div>

          <div className="meta-item">
            <label>Assigned To</label>
            <p>{event?.assignedTo}</p>
          </div>
        </div>

        {/* EDITABLE DESCRIPTION */}
        <div className="eventpage-section">
          <h3>Description</h3>
          <textarea
            className="input-box"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write event description..."
          />
        </div>

        {/* EDITABLE SUMMARY */}
        <div className="eventpage-section">
          <h3>Summary</h3>
          <textarea
            className="input-box"
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="Write summary..."
          />
        </div>

        {/* TASK SECTION */}
        <div className="eventpage-section">
          <h3>Task Information</h3>

          <div className="task-box">
            <div className="task-row">
              <label>Task ID:</label>
              <p>{taskId}</p>
            </div>

            <div className="task-row">
              <label>Status:</label>
              <p>Open</p>
            </div>

            <button
              className="task-btn"
              onClick={() => navigate(`/task/${taskId}`, { state: { event, taskId } })}
            >
              Open Task
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT: MAP */}
      <div className="eventpage-map">
        <iframe
          className="event-map-frame"
          src={`https://www.google.com/maps?q=${event?.coords?.[1]},${event?.coords?.[0]}&z=14&output=embed`}
          title="map"
        />
      </div>

    </div>
  );
}

export default EventPage;
