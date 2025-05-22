import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MeetingList.css";

interface Meeting {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: string[];
  createdBy: string;
  status: string;
}

export default function MeetingList() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateFilter, setDateFilter] = useState<string>("");
  const [participantFilter, setParticipantFilter] = useState<string>("");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await axios.get<Meeting[]>("http://localhost:3001/meetings");
        const userMeetings = res.data.filter(
          (m) => m.createdBy === user.email
        );
        setMeetings(userMeetings);
      } catch (err) {
        console.error("❌ Błąd pobierania spotkań:", err);
      }
    };
    fetchMeetings();
  }, [user.email]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Czy na pewno chcesz usunąć to spotkanie?")) return;
    try {
      await axios.delete(`http://localhost:3001/meetings/${id}`);
      setMeetings((prev) => prev.filter((m) => m.id !== id));
      alert("✅ Spotkanie usunięte");
    } catch (err) {
      console.error("❌ Błąd usuwania:", err);
      alert("Nie udało się usunąć spotkania");
    }
  };

  const filteredMeetings = meetings
    .filter((m) =>
      statusFilter === "all" ? true : m.status === statusFilter
    )
    .filter((m) =>
      dateFilter ? m.date === dateFilter : true
    )
    .filter((m) =>
      participantFilter
        ? m.participants.some((p) => p.includes(participantFilter.trim()))
        : true
    )
    .sort((a, b) => {
      const dateA = new Date(`${a.date}T${a.startTime}`);
      const dateB = new Date(`${b.date}T${b.startTime}`);
      return sortDirection === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });

  return (
    <div className="meetinglist-bg">
      <div className="meetinglist-container">
        <h2>Moje spotkania</h2>

        <div className="meeting-filters">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Wszystkie</option>
            <option value="scheduled">Zaplanowane</option>
            <option value="canceled">Odwołane</option>
          </select>

          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />

          <input
            type="text"
            placeholder="Filtruj po uczestniku"
            value={participantFilter}
            onChange={(e) => setParticipantFilter(e.target.value)}
          />

          <button
            onClick={() =>
              setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
            }
            className="sort-button"
          >
            Sortuj: {sortDirection === "asc" ? "Rosnąco" : "Malejąco"}
          </button>
        </div>

        {filteredMeetings.length === 0 ? (
          <p>Brak spotkań.</p>
        ) : (
          <ul className="meeting-grid">
            {filteredMeetings.map((meeting) => (
              <li key={meeting.id} className="meeting-card">
                <h3>{meeting.title || "Brak tytułu"}</h3>
                <p><strong>Data:</strong> {meeting.date || "-"}</p>
                <p><strong>Godzina:</strong> {meeting.startTime} – {meeting.endTime}</p>
                <p><strong>Opis:</strong> {meeting.description || "-"}</p>
                <p><strong>Uczestnicy:</strong> {meeting.participants.join(", ") || "-"}</p>
                <p><strong>Status:</strong> {meeting.status}</p>
                <div className="meeting-actions">
                  <button onClick={() => navigate(`/edit/${meeting.id}`)}>
                    ✏️ Edytuj
                  </button>
                  <button onClick={() => handleDelete(meeting.id)}>
                    🗑️ Usuń
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
