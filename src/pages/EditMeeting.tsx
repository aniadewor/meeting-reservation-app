import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"

function EditMeeting() {
  const { id } = useParams()
  const { register, handleSubmit, reset } = useForm()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await axios.get(`http://localhost:3003/meetings/${id}`)
        const data = res.data
        // rozbijamy uczestników z tablicy na tekst
        reset({
          title: data.title,
          description: data.description,
          date: data.date,
          startTime: data.startTime,
          endTime: data.endTime,
          participants: data.participants.join(", "),
          status: data.status
        })
        setLoading(false)
      } catch (err) {
        console.error("❌ Błąd ładowania spotkania:", err)
        alert("Nie udało się załadować spotkania")
      }
    }

    fetchMeeting()
  }, [id, reset])

  const onSubmit = async (data: any) => {
    try {
      const updatedMeeting = {
        ...data,
        participants: data.participants.split(",").map((email: string) => email.trim()),
      }

      await axios.put(`http://localhost:3003/meetings/${id}`, updatedMeeting)
      alert("✅ Spotkanie zaktualizowane!")
      navigate("/meetings")
    } catch (err) {
      console.error("❌ Błąd zapisu edycji:", err)
      alert("Nie udało się zapisać zmian")
    }
  }

  if (loading) return <p>Ładowanie...</p>

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Edytuj spotkanie</h2>

      <input placeholder="Tytuł" {...register("title")} />
      <textarea placeholder="Opis" {...register("description")} />
      <input type="date" {...register("date")} />
      <input type="time" {...register("startTime")} />
      <input type="time" {...register("endTime")} />
      <input placeholder="Uczestnicy (emaile)" {...register("participants")} />
      <select {...register("status")}>
        <option value="scheduled">Zaplanowane</option>
        <option value="canceled">Odwołane</option>
      </select>

      <button type="submit">Zapisz zmiany</button>
    </form>
  )
}

export default EditMeeting
