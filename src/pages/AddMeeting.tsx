import { useForm } from "react-hook-form"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function AddMeeting() {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()

  const onSubmit = async (data: any) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}")

      const newMeeting = {
        ...data,
        participants: data.participants.split(",").map((email: string) => email.trim()),
        createdBy: user.email,
        status: "scheduled",
        createdAt: new Date().toISOString()
      }

      await axios.post("http://localhost:3003/meetings", newMeeting)
      alert("✅ Spotkanie zostało dodane!")
      navigate("/") // lub np. navigate("/meetings")
    } catch (err: any) {
      console.error("❌ Błąd dodawania spotkania:", err.message)
      alert("Błąd zapisu spotkania")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Dodaj spotkanie</h2>

      <input placeholder="Tytuł" {...register("title")} />
      <textarea placeholder="Opis" {...register("description")} />
      <input type="date" {...register("date")} />
      <input type="time" {...register("startTime")} />
      <input type="time" {...register("endTime")} />
      <input placeholder="Uczestnicy (emaile, oddzielone przecinkami)" {...register("participants")} />

      <button type="submit">Zapisz spotkanie</button>
    </form>
  )
}

export default AddMeeting
