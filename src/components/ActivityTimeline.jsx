import '../styles/ActivityTimeline.css'

function ActivityTimeline() {
  const activities = [
    { time: '11:55:58 am', message: 'Automated status ping' },
    { time: '11:55:46 am', message: 'Automated status ping' },
    { time: '11:55:34 am', message: 'Automated status ping' },
    { time: '11:55:22 am', message: 'Automated status ping' },
  ]

  return (
    <div className="activity-timeline">
      <div className="timeline-header">
        <h3 className="timeline-title">Activity Timeline</h3>
        <span className="timeline-badge">Real-time updates</span>
      </div>

      <div className="timeline-list">
        {activities.map((activity, index) => (
          <div key={index} className="timeline-item">
            <span className="timeline-time">{activity.time}</span>
            <span className="timeline-message">{activity.message}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ActivityTimeline
