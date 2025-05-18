import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "./MeetingList.css"
interface Meeting {
  id: number
  title: string
  description: string
  date: string
  startTime: string
  endTime: string
  participants: string[]
  createdBy: string
  status: string
}

function MeetingList() {
  const [meetings, setMeetings] = useState<Meeting[]>([])
  const [statusFilter, setStatusFilter] = useState("all")
  const [sortDirection, setSortDirection] = useState("asc")
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "{}")

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await axios.get("http://localhost:3003/meetings")
        const userMeetings = res.data.filter(
          (meeting: Meeting) => meeting.createdBy === user.email
        )
        setMeetings(userMeetings)
      } catch (err) {
        console.error("❌ Błąd pobierania spotkań:", err)
      }
    }

    fetchMeetings()
  }, [])

  const handleDelete = async (id: number) => {
    const confirmDelete = confirm("Czy na pewno chcesz usunąć to spotkanie?")
    if (!confirmDelete) return

    try {
      await axios.delete(`http://localhost:3003/meetings/${id}`)
      setMeetings(meetings.filter((m) => m.id !== id))
      alert("✅ Spotkanie usunięte")
    } catch (err) {
      console.error("❌ Błąd usuwania:", err)
      alert("Nie udało się usunąć spotkania")
    }
  }

  const filteredMeetings = meetings
    .filter((m) => statusFilter === "all" || m.status === statusFilter)
    .sort((a, b) => {
      const dateA = new Date(a.date + " " + a.startTime)
      const dateB = new Date(b.date + " " + b.startTime)
      return sortDirection === "asc"
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime()
    })

  return (
  <div className="meetinglist-bg">
    <div className="meetinglist-container">
      <h2>Moje spotkania</h2>
      {meetings.length === 0 ? (
        <p>Brak spotkań.</p>
      ) : (
        <ul className="meeting-list">
          {meetings.map((meeting) => (
            <li key={meeting.id} className="meeting-card">
              <h3>{meeting.title}</h3>
              <p>
                <strong>Data:</strong> {meeting.date} <br />
                <strong>Godzina:</strong> {meeting.startTime} - {meeting.endTime}
              </p>
              <p><strong>Opis:</strong> {meeting.description}</p>
              <p><strong>Uczestnicy:</strong> {meeting.participants.join(", ")}</p>
              <p><strong>Status:</strong> {meeting.status}</p>
              <div className="meeting-actions">
                <button onClick={() => navigate(`/edit/${meeting.id}`)}>✏️ Edytuj</button>
                <button onClick={() => handleDelete(meeting.id)}>🗑️ Usuń</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
)
}

export default MeetingList
