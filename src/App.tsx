import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AddMeeting from "./pages/AddMeeting"
import MeetingList from "./pages/MeetingList"
import EditMeeting from "./pages/EditMeeting"
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<div>404 - Not Found</div>} />
      <Route path="/add" element={<AddMeeting />} />
      <Route path="/meetings" element={<MeetingList />} />
      <Route path="/edit/:id" element={<EditMeeting />} />
    </Routes>
  )
}

export default App
