
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddMeeting from "./pages/AddMeeting";
import MeetingList from "./pages/MeetingList";
import EditMeeting from "./pages/EditMeeting";
import CalendarView from "./pages/CalendarView";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* Publiczne */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Chronione dla user i admin */}
      <Route
        path="/"
        element={
          <PrivateRoute allowedRoles={["user", "admin"]}>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/add"
        element={
          <PrivateRoute allowedRoles={["user", "admin"]}>
            <AddMeeting />
          </PrivateRoute>
        }
      />
      <Route
        path="/meetings"
        element={
          <PrivateRoute allowedRoles={["user", "admin"]}>
            <MeetingList />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <PrivateRoute allowedRoles={["user", "admin"]}>
            <EditMeeting />
          </PrivateRoute>
        }
      />
      <Route
        path="/calendar"
        element={
          <PrivateRoute allowedRoles={["user", "admin"]}>
            <CalendarView />
          </PrivateRoute>
        }
      />

      {/* Tylko admin */}
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />

      {/* 404 – zawsze na samym dole */}
      <Route path="*" element={<div>404 - Not Found</div>} />
    </Routes>
  );
}

export default App;
