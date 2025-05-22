import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./MeetingList.css";

interface Meeting {
  id: number;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: string[];
  createdBy: string;
  status: string;
}

const MeetingList: React.FC = () => {
  const [meetings, setMeetings] = useState<Meeting[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortDirection, setSortDirection] = useState("asc");
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await axios.get<Meeting[]>("http://localhost:3001/meetings");
        const userMeetings = res.data.filter(
          (meeting) => meeting.createdBy === user.email
        );
        setMeetings(userMeetings);
      } catch (err) {
        console.error("❌ Błąd pobierania spotkań:", err);
      }
    };
    fetchMeetings();
  }, [user.email]);

  const handleDelete = async (id: number) => {
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
    .filter((m) => statusFilter === "all" || m.status === statusFilter)
    .sort((a, b) => {
      const dateA = new Date(`${a.date} ${a.startTime}`);
      const dateB = new Date(`${b.date} ${b.startTime}`);
      return sortDirection === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime();
    });

  return (
    <div className="meetinglist-bg">
      <div className="meetinglist-container">
        <h2>Moje spotkania</h2>
        {filteredMeetings.length === 0 ? (
          <p>Brak spotkań.</p>
        ) : (
          <ul className="meeting-grid">
            {filteredMeetings.map((meeting) => (
              <li key={meeting.id} className="meeting-card">
                <h3>{meeting.title || "Brak tytułu"}</h3>
                <p><strong>Data:</strong> {meeting.date || "-"}</p>
                <p>
                  <strong>Godzina:</strong> {meeting.startTime || "-"} – {meeting.endTime || "-"}
                </p>
                <p><strong>Opis:</strong> {meeting.description || "-"}</p>
                <p>
                  <strong>Uczestnicy:</strong> {meeting.participants?.length ? meeting.participants.join(", ") : "-"}
                </p>
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
};

export default MeetingList;