import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

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
    <div>
      <h2>Moje spotkania</h2>

      {/* Filtrowanie i sortowanie */}
      <div style={{ marginBottom: "1rem" }}>
        <label>Status:&nbsp;</label>
        <select onChange={(e) => setStatusFilter(e.target.value)} value={statusFilter}>
          <option value="all">Wszystkie</option>
          <option value="scheduled">Zaplanowane</option>
          <option value="canceled">Odwołane</option>
        </select>

        &nbsp;&nbsp;

        <label>Sortuj wg daty:&nbsp;</label>
        <select onChange={(e) => setSortDirection(e.target.value)} value={sortDirection}>
          <option value="asc">Od najstarszych</option>
          <option value="desc">Od najnowszych</option>
        </select>
      </div>

      {filteredMeetings.length === 0 ? (
        <p>Brak pasujących spotkań.</p>
      ) : (
        <ul>
          {filteredMeetings.map((meeting) => (
            <li key={meeting.id} style={{ marginBottom: "1rem" }}>
              <strong>{meeting.title}</strong> – {meeting.date} {meeting.startTime}-{meeting.endTime}<br />
              {meeting.description}<br />
              Uczestnicy: {meeting.participants?.join(", ") || "brak"}<br />
              Status: {meeting.status}<br />

              <button onClick={() => navigate(`/edit/${meeting.id}`)}>✏️ Edytuj</button>
              &nbsp;
              <button onClick={() => handleDelete(meeting.id)}>🗑️ Usuń</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MeetingList
