import '../styles/Header.css'

function Header({ onNewEvent, searchQuery, onSearchChange }) {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="logo">ESA</h1>
        <span className="app-title">Event Situational Awareness</span>
      </div>
      <div className="header-right">
        <input
          type="text"
          className="search-input"
          placeholder="Search events, IDs, locations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button className="new-event-btn" onClick={onNewEvent}>
          Create Event
        </button>
        <a href="/admin" className="admin-link">
          Admin
        </a>
      </div>
    </header>
  )
}

export default Header
