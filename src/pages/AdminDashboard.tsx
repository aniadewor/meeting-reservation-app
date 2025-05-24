import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

interface User {
  id: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  email: string;
  role: string;
}

interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: string[];
  createdBy?: string;
  status: string;
  createdAt?: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const navigate = useNavigate();

  // Sprawdzenie roli
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user") || "null");
    if (!currentUser || currentUser.role !== "admin") {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  // Fetch użytkowników i spotkań
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get<User[]>("http://localhost:3001/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Error fetching users:", err));

    axios
      .get<Meeting[]>("http://localhost:3001/meetings")
      .then((res) => setMeetings(res.data))
      .catch((err) => console.error("Error fetching meetings:", err));
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm("Czy na pewno chcesz usunąć tego użytkownika?")) return;
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      alert("✅ Użytkownik usunięty");
    } catch (err) {
      console.error("Error deleting user:", err);
      alert("Nie udało się usunąć użytkownika");
    }
  };

  const handleDeleteMeeting = async (id: string) => {
    if (!window.confirm("Czy na pewno chcesz usunąć to spotkanie?")) return;
    try {
      await axios.delete(`http://localhost:3001/meetings/${id}`);
      setMeetings((prev) => prev.filter((m) => m.id !== id));
      alert("✅ Spotkanie usunięte");
    } catch (err) {
      console.error("Error deleting meeting:", err);
      alert("Nie udało się usunąć spotkania");
    }
  };

  return (
    <div className="admin-bg">
      <div className="dashboard-box">
        <h2>Panel Administratora</h2>

        <section className="admin-section">
          <h3>Użytkownicy</h3>
          <ul>
            {users.map((u) => (
              <li key={u.id} className="admin-item">
                <span>
                  {u.firstName || u.username || "(brak nazwy)"}{u.lastName ? ` ${u.lastName}` : ""} ({u.email}) – <em>{u.role}</em>
                </span>
                <button onClick={() => handleDeleteUser(u.id)} className="delete-button">
                  🗑️ Usuń
                </button>
              </li>
            ))}
            {users.length === 0 && <li>Brak użytkowników.</li>}
          </ul>
        </section>

        <section className="admin-section">
          <h3>Wszystkie spotkania</h3>
          <ul>
            {meetings.map((m) => (
              <li key={m.id} className="admin-item meeting-item">
                <div className="meeting-info">
                  <strong>{m.title || "(bez tytułu)"}</strong><br />
                  <small>
                    Data: {m.date || "-"} {m.startTime || "-"} – {m.endTime || "-"}
                  </small><br />
                  <small>Utworzone przez: {m.createdBy || "-"}</small><br />
                  <small>Status: {m.status}</small>
                </div>
                <button onClick={() => handleDeleteMeeting(m.id)} className="delete-button">
                  🗑️ Usuń
                </button>
              </li>
            ))}
            {meetings.length === 0 && <li>Brak spotkań do wyświetlenia.</li>}
          </ul>
        </section>
      </div>
    </div>
  );
}
