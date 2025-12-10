import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./Dashboard";
import EventPage from "./components/EventPage";
import TaskPage from "./components/TaskPage";
import AdminPanel from "./components/AdminPanel";
import AdminEventDetails from "./components/AdminEventDetails";
import ActivityTimeline from "./components/ActivityTimeline";
import { getToken, getRole } from "./utils/auth";

function PrivateRoute({ children }) {
  const token = getToken();
  return token ? children : <Navigate to="/login" />;
}

function RoleRoute({ children, allow }) {
  const role = getRole();
  return allow.includes(role) ? children : <Navigate to="/dashboard" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/event/:id" element={<PrivateRoute><EventPage /></PrivateRoute>} />
        <Route path="/task/:taskId" element={<PrivateRoute><TaskPage /></PrivateRoute>} />

        <Route path="/admin" element={<RoleRoute allow={["ADMIN","SUPER_ADMIN"]}><AdminPanel /></RoleRoute>} />
        <Route path="/admin/event/:id" element={<RoleRoute allow={["ADMIN","SUPER_ADMIN"]}><AdminEventDetails /></RoleRoute>} />
        <Route path="/admin/activity" element={<RoleRoute allow={["SUPER_ADMIN"]}><ActivityTimeline /></RoleRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
