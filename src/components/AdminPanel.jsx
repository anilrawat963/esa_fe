import "../styles/AdminPanel.css";
import { useNavigate } from "react-router-dom";

function AdminPanel({ adminName = "Suraj Gupta" }) {
  const navigate = useNavigate();

  return (
    <div className="admin-container">

      {/* HEADER */}
      <div className="admin-header-pro">
        <h1>Event Viewer</h1>
        <span>Admin: {adminName}</span>
      </div>

      {/* GRID CARDS */}
      <div className="admin-grid">

        {/* DRAFT CARD */}
        <div className="admin-card-pro">
          <h3>Draft Events</h3>

          <input id="draft-title" className="admin-input" placeholder="Event title..." />

          <textarea id="draft-comment" className="admin-textarea" placeholder="Comment..."></textarea>

          <input id="draft-lat" className="admin-input" placeholder="Latitude..." />
          <input id="draft-lng" className="admin-input" placeholder="Longitude..." />

          <button
            className="admin-btn"
            onClick={() =>
              navigate("/admin/event-details", {
                state: {
                  title: document.querySelector("#draft-title").value,
                  comment: document.querySelector("#draft-comment").value,
                  lat: document.querySelector("#draft-lat").value,
                  lng: document.querySelector("#draft-lng").value,
                },
              })
            }
          >
            View Details
          </button>
        </div>

        {/* TASK CARD */}
        <div className="admin-card-pro">
          <h3>Task Progress Events</h3>

          <input className="admin-input" placeholder="Task title..." />

          <textarea className="admin-textarea" placeholder="Progress comment..."></textarea>

          <button className="admin-btn">View</button>
        </div>

        {/* CLOSED CARD */}
        <div className="admin-card-pro">
          <h3>Closed Events</h3>
          <p className="empty-text">No closed events yet</p>
        </div>

      </div>
    </div>
  );
}

export default AdminPanel;
