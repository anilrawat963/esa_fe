/* Sb EventDetails*/
import { useState } from "react";
import "../styles/EventDetails.css";

function EventDetails({ event, isSideCollapsed, setIsSideCollapsed }) {
  if (!event) return null;

  const [collapsed, setCollapsed] = useState(false);

  // Added lists — does not modify your existing code
  const resources = [
    { name: "Ambulance", count: 3 },
    { name: "Fire Trucks", count: 2 },
    { name: "Rescue Teams", count: 4 },
  ];

  const quickActions = [
    "Send Alert to Public",
    "Open Incident Report",
    "Export Snapshot",
  ];

  // Professional Info Cards data
  const infoCards = [
    { title: "Event Type", value: "Road Accident", icon: "🚧" },
    { title: "People Affected", value: "5+", icon: "🧍" },
    { title: "Response ETA", value: "10 mins", icon: "⏱️" },
    { title: "Priority Level", value: "High", icon: "🔺" },
  ];

  return (
    <>
      {/* Background overlay when expanded - click outside to close */}
      {isSideCollapsed && (
        <div
          className="event-overlay"
          onClick={() => setIsSideCollapsed(false)}
        ></div>
      )}

      <aside
        className={`event-details 
          ${collapsed ? "collapsed-panel" : ""} 
          ${isSideCollapsed ? "expanded-panel" : ""}`}
      >
        <div className="details-header">
          {/* Collapse Map (expand details area) */}
          <button
            className="side-collapse-toggle"
            onClick={() => setIsSideCollapsed(!isSideCollapsed)}
            title={isSideCollapsed ? "Expand Map" : "Collapse Map"}
          >
            {isSideCollapsed ? "▶" : "◀"}
          </button>

          {!collapsed && <h2 className="event-label">Event Details</h2>}
        </div>

        {!collapsed && (
          <div className="details-content">
            <div className="event-title-section">
              <h2 className="event-title">{event.name}</h2>
              <span
                className={`severity-badge-large ${event.severity.toLowerCase()}`}
              >
                {event.severity}
              </span>
            </div>

            <p className="event-subtitle">
              {event.id} • {event.location}
            </p>

            <p className="event-full-description">{event.description}</p>

            <div className="action-buttons">
              <button className="btn-secondary">Assign Resource</button>
              <button className="btn-danger">Escalate</button>
            </div>

            {/*Card Adding*/}
            <div className="event-info-cards">
              {infoCards.map((card, index) => (
                <div key={index} className="event-info-card">
                  <div className="event-info-icon">{card.icon}</div>
                  <div className="event-info-text">
                    <h4 className="event-info-label">{card.title}</h4>
                    <p className="event-info-value">{card.value}</p>
                  </div>
                </div>
              ))}
            </div>
            {/*End Card Adding*/}

            <div className="info-section">
              <div className="info-item">
                <label>Status</label>
                <p>Active</p>
              </div>
              <div className="info-item">
                <label>Assigned To</label>
                <p>{event.assignedTo}</p>
              </div>
            </div>

            <div className="quick-notes-section">
              <label>Quick Notes</label>
              <textarea
                className="notes-textarea"
                placeholder="Add internal notes..."
              ></textarea>
            </div>

            {/* NEW MERGED SECTIONS BELOW */}
            <div className="resources-section">
              <h3 className="section-title">Resources</h3>
              <div className="resources-list">
                {resources.map((resource, index) => (
                  <div key={index} className="resource-item">
                    <span className="resource-name">{resource.name}</span>
                    <span className="resource-count">{resource.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="quick-actions-section">
              <h3 className="section-title">Quick Actions</h3>
              <div className="actions-list">
                {quickActions.map((action, index) => (
                  <button key={index} className="action-btn">
                    {action}
                  </button>
                ))}
              </div>
            </div>
            {/* END MERGED BLOCK */}
          </div>
        )}
      </aside>
    </>
  );
}

export default EventDetails;
