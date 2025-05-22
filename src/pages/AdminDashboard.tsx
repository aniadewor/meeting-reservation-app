import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

interface User {
  id: string;
  username: string;
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

  useEffect(() => {
    // jeśli nie admin, przekieruj
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user || user.role !== "admin") {
      navigate("/");
    }

    axios.get<User[]>("http://localhost:3001/users").then((res) => setUsers(res.data));
    axios
      .get<Meeting[]>("http://localhost:3001/meetings")
      .then((res) => setMeetings(res.data));
  }, [navigate]);

  return (
    <div className="dashboard-bg">
      <div className="dashboard-box">
        <h2>Panel Administratora</h2>

        <section className="admin-section">
          <h3>Użytkownicy</h3>
          <ul>
            {users.map((u) => (
              <li key={u.id}>
                {u.username || '(brak nazwy)'} ({u.email || '(brak email)'}) – {u.role}
              </li>
            ))}
          </ul>
        </section>

        <section className="admin-section">
          <h3>Wszystkie rezerwacje</h3>
          <ul>
            {meetings.map((m) => (
              <li key={m.id}>
                [{m.status}] {m.title || '(brak tytułu)'} – {m.date || '-'} {m.startTime || '-'}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
