import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditMeeting.css";

function EditMeeting() {
  const { id } = useParams<{ id: string }>();
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/meetings/${id}`);
        const data = res.data;
        reset({
          title: data.title,
          description: data.description,
          date: data.date,
          startTime: data.startTime,
          endTime: data.endTime,
          participants: data.participants.join(", "),
          status: data.status,
        });
      } catch (err) {
        console.error("❌ Błąd ładowania spotkania:", err);
        alert("Nie udało się załadować spotkania");
      } finally {
        setLoading(false);
      }
    };

    fetchMeeting();
  }, [id, reset]);

  const onSubmit = async (data: any) => {
    try {
      const updatedMeeting = {
        ...data,
        participants: data.participants
          .split(",")
          .map((email: string) => email.trim())
          .filter((e: string) => e),
      };

      await axios.put(`http://localhost:3001/meetings/${id}`, updatedMeeting);
      alert("✅ Spotkanie zaktualizowane!");
      navigate("/meetings");
    } catch (err) {
      console.error("❌ Błąd zapisu edycji:", err);
      alert("Nie udało się zapisać zmian");
    }
  };

  if (loading) return <p>Ładowanie...</p>;

  return (
    <div className="edit-bg">
      <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Edytuj spotkanie</h2>

        <input
          className="edit-form__field"
          placeholder="Tytuł"
          {...register("title")}
        />

        <textarea
          className="edit-form__field edit-form__textarea"
          placeholder="Opis"
          {...register("description")}
        />

        <input
          className="edit-form__field"
          type="date"
          {...register("date")}
        />

        <input
          className="edit-form__field"
          type="time"
          {...register("startTime")}
        />

        <input
          className="edit-form__field"
          type="time"
          {...register("endTime")}
        />

        <input
          className="edit-form__field"
          placeholder="Uczestnicy (emaile)"
          {...register("participants")}
        />

        <select
          className="edit-form__field edit-form__select"
          {...register("status")}
        >
          <option value="scheduled">Zaplanowane</option>
          <option value="canceled">Odwołane</option>
        </select>

        <button className="edit-form__button" type="submit">
          Zapisz zmiany
        </button>
      </form>
    </div>
  );
}

export default EditMeeting;