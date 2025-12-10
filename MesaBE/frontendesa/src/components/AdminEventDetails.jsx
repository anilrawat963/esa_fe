import { useState } from "react";
import { useLocation } from "react-router-dom";
import "../styles/AdminEventDetails.css";

function AdminEventDetails() {
  const { state } = useLocation();

  const [formData, setFormData] = useState({
    title: state?.title || "",
    comment: state?.comment || "",
    masterComment: "",
    assignedUsers: [],
  });

  const users = ["Ravi Patel", "Priya Sharma", "Anil Rawat", "Leena Kapoor"];

  const eventLocation = {
    lat: state?.lat || 28.6139,
    lng: state?.lng || 77.2090,
  };

  const toggleUser = (name) => {
    setFormData((prev) => ({
      ...prev,
      assignedUsers: prev.assignedUsers.includes(name)
        ? prev.assignedUsers.filter((u) => u !== name)
        : [...prev.assignedUsers, name],
    }));
  };

  const handleSubmit = () => {
    alert("Event Updated Successfully!");
  };

  return (
    <div className="event-details-container">

      {/* HEADER */}
      <div className="event-details-header">
        <h1>Event Details</h1>
        <p className="sub-text">Review & update the selected event details</p>
      </div>

      {/* MAIN CARD */}
      <div className="event-card">

        {/* TITLE */}
        <div className="field-block">
          <label className="field-label">Event Title</label>
          <input
            className="field-input"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter event title..."
          />
        </div>

        {/* COMMENT */}
        <div className="field-block">
          <label className="field-label">Event Comment</label>
          <textarea
            className="field-textarea"
            value={formData.comment}
            onChange={(e) =>
              setFormData({ ...formData, comment: e.target.value })
            }
            placeholder="Enter comment..."
          ></textarea>
        </div>

        {/* MAP */}
        <div className="map-section-pro">
          <label className="field-label">Event Location</label>
          <iframe
            className="map-frame"
            src={`https://www.google.com/maps?q=${eventLocation.lat},${eventLocation.lng}&z=14&output=embed`}
          ></iframe>
        </div>

        {/* MASTER COMMENT */}
        <div className="field-block">
          <label className="field-label">Master Comments</label>
          <textarea
            className="field-textarea"
            value={formData.masterComment}
            onChange={(e) =>
              setFormData({ ...formData, masterComment: e.target.value })
            }
            placeholder="Write a detailed master comment..."
          ></textarea>
        </div>

        {/* USER ASSIGN */}
        <div className="field-block">
          <label className="field-label">Assign Users</label>

          <div className="checkbox-grid">
            {users.map((name) => (
              <label key={name} className="checkbox-item-pro">
                <input
                  type="checkbox"
                  checked={formData.assignedUsers.includes(name)}
                  onChange={() => toggleUser(name)}
                />
                {name}
              </label>
            ))}
          </div>
        </div>

        {/* SUBMIT BUTTON */}
        <button className="submit-btn-pro" onClick={handleSubmit}>
          Update Event
        </button>

      </div>
    </div>
  );
}

export default AdminEventDetails;
