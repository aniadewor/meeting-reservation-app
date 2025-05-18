import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AddMeeting from "./pages/AddMeeting"
import MeetingList from "./pages/MeetingList"
import EditMeeting from "./pages/EditMeeting"
import Dashboard from "./pages/Dashboard"
import PrivateRoute from "./components/PrivateRoute"

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
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/add"
        element={
          <PrivateRoute>
            <AddMeeting />
          </PrivateRoute>
        }
      />
      <Route
        path="/meetings"
        element={
          <PrivateRoute>
            <MeetingList />
          </PrivateRoute>
        }
      />
      <Route
        path="/edit/:id"
        element={
          <PrivateRoute>
            <EditMeeting />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default App
