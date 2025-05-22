// src/App.tsx
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddMeeting from "./pages/AddMeeting";
import MeetingList from "./pages/MeetingList";
import EditMeeting from "./pages/EditMeeting";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";  // ← nowy import
import PrivateRoute from "./components/PrivateRoute";
import CalendarView from "./pages/CalendarView";

function App() {
  return (
    <Routes>
      {/* Publiczne trasy */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<div>404 - Not Found</div>} />

      {/* Chronione trasy */}
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

      {/* Panel administratora */}
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          </PrivateRoute>
        }
      />
      <Route
    path="/calendar"
    element={
      <PrivateRoute allowedRoles={['user','admin']}>
        <CalendarView />
      </PrivateRoute>
    }
  />
    </Routes>
  );
}

export default App;
