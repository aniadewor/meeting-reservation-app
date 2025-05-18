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
  const user = JSON.parse(localStorage.getItem("user") || "{}")
    const navigate = useNavigate()
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await axios.get("http://localhost:3003/meetings")
        // Pokaż tylko spotkania utworzone przez zalogowanego użytkownika
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

  return (
    <div>
      <h2>Moje spotkania</h2>
      {meetings.length === 0 ? (
        <p>Brak spotkań.</p>
      ) : (
        <ul>
          {meetings.map((meeting) => (
            <li key={meeting.id}>
  <strong>{meeting.title}</strong> – {meeting.date} {meeting.startTime}-{meeting.endTime}<br />
  {meeting.description}<br />
  Uczestnicy: {meeting.participants.join(", ")}<br />
  Status: {meeting.status}<br />
<button onClick={() => navigate(`/edit/${meeting.id}`)}>✏️ Edytuj</button>

  <button onClick={() => handleDelete(meeting.id)}>🗑️ Usuń</button>
</li>

          ))}
        </ul>
      )}
    </div>
  )
}

export default MeetingList
