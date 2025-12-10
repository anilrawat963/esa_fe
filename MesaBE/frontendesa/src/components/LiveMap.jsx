export default function LiveMap({ events = [], selectedEvent, isSideCollapsed }) {
  const defaultCoords = selectedEvent?.latitude && selectedEvent?.longitude
    ? `${selectedEvent.latitude},${selectedEvent.longitude}`
    : (events[0] && events[0].latitude && events[0].longitude ? `${events[0].latitude},${events[0].longitude}` : "20.5937,78.9629");

  const q = encodeURIComponent(defaultCoords);
  const src = `https://www.google.com/maps?q=${q}&z=8&output=embed`;

  return (
    <div className="live-map">
      <iframe title="map" className="map-iframe" src={src}></iframe>
    </div>
  );
}
