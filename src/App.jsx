/* mesa code */

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import AdminPanel from "./components/AdminPanel";
import AdminEventDetails from "./components/AdminEventDetails";
import EventPage from "./components/EventPage";
import TaskPage from "./components/TaskPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/admin" element={<AdminPanel adminName="Suraj Gupta" />} />
        <Route path="/admin/event-details" element={<AdminEventDetails />} />

        {/* ⭐ ADD THESE TWO ROUTES ⭐ */}
        <Route path="/event/:id" element={<EventPage />} />
        <Route path="/task/:taskId" element={<TaskPage />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
