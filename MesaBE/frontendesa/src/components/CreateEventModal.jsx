/* ESA-4 */

import { useState } from "react";
import { authFetch } from "../utils/auth";
import "../styles/CreateEventModal.css";

export default function CreateEventModal({ onClose, onCreateEvent, userId, userName = "Suraj Gupta" }) {

  const [formData, setFormData] = useState({
    eventName: '',
    location: '',
    severity: 'Medium',
    assignedUsers: [],
    summary: '',
    eventDate: '',
    uploadedFile: null,
  })

  const users = [
    'Priya Sharma',
    'Ravi Patel',
    'Anil Rawat',
    'Leena Kapoor',
  ]

  const handleUserToggle = (user) => {
    setFormData((prev) => ({
      ...prev,
      assignedUsers: prev.assignedUsers.includes(user)
        ? prev.assignedUsers.filter((u) => u !== user)
        : [...prev.assignedUsers, user],
    }))
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0]
    setFormData((prev) => ({ ...prev, uploadedFile: file }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const eventId = `EVT-${Date.now().toString().slice(-4)}`

    const now = new Date()
    const datetime = now.toLocaleString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    })

    const newEvent = {
      id: eventId,
      name: formData.eventName,
      severity: formData.severity,
      location: formData.location,
      datetime: datetime,
      eventDate: formData.eventDate,
      assignedTo: formData.assignedUsers.length > 0
        ? formData.assignedUsers.join(', ')
        : 'Unassigned',
      description: formData.summary,
      uploadedFile: formData.uploadedFile,
      createdBy: userId || "Unknown User",
      createdUserName: userName,
    }

    if (onCreateEvent) {
      onCreateEvent(newEvent)
    }

    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>

        {/* 🔥 EXTENDED HEADER WITH USER DETAILS */}
        <div className="modal-header">
          <h2 className="modal-title">Create Event</h2>

          <div className="user-info-box">

            {/* Auto-generated avatar */}
            <img
              src={`https://ui-avatars.com/api/?name=${userName.replace(
                " ",
                "+"
              )}&background=007bff&color=fff`}
              alt="User Avatar"
              className="user-avatar"
            />

            <div className="user-text">
              <span className="user-name">{userName}</span>
              <span className="user-id">
                User ID: <strong>{userId || "N/A"}</strong>
              </span>
            </div>
          </div>

          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>

        {/* FORM START */}
        <form className="modal-form" onSubmit={handleSubmit}>

          <div className="form-row">
            <div className="form-group">
              <label>Event Name</label>
              <input
                type="text"
                placeholder="e.g. Flood at Eastbank"
                value={formData.eventName}
                onChange={(e) =>
                  setFormData({ ...formData, eventName: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                placeholder="City / Sector / Landmark"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Severity</label>
              <select
                value={formData.severity}
                onChange={(e) =>
                  setFormData({ ...formData, severity: e.target.value })
                }
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

            <div className="form-group">
              <label>Event Date</label>
              <input
                type="date"
                value={formData.eventDate}
                onChange={(e) =>
                  setFormData({ ...formData, eventDate: e.target.value })
                }
              />
            </div>
          </div>

          {/* USERS ASSIGN */}
          <div className="form-row">
            <div className="form-group full-width">
              <label>Assign to Users</label>
              <div className="users-checkboxes">
                {users.map((user) => (
                  <label key={user} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.assignedUsers.includes(user)}
                      onChange={() => handleUserToggle(user)}
                    />
                    {user}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* FILE UPLOAD */}
          <div className="form-row">
            <div className="form-group full-width">
              <label>Upload File (KML / JSON / CSV / PDF / Image)</label>
              <input
                type="file"
                accept=".kml,.json,.geojson,.csv,.pdf,.png,.jpg,.jpeg"
                onChange={handleFileUpload}
              />
              {formData.uploadedFile && (
                <p className="uploaded-file-name">
                  Selected File: {formData.uploadedFile.name}
                </p>
              )}
            </div>
          </div>

          <div className="form-group">
            <label>Summary</label>
            <textarea
              placeholder="Short description of the incident"
              value={formData.summary}
              onChange={(e) =>
                setFormData({ ...formData, summary: e.target.value })
              }
            ></textarea>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Create Event
            </button>
          </div>
        </form>
      </div>
    </div>

  );
}
