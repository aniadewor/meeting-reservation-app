import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./EditMeeting.css";

// Używamy oddzielnego typu dla formularza, gdzie participants jest string, nie tablica
interface EditFormData {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: string;
  status: "scheduled" | "canceled";
}

export default function EditMeeting() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<EditFormData>({ mode: "onBlur" });

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await axios.get<EditFormData & { participants: string[] }>(
          `http://localhost:3001/meetings/${id}`
        );
        const data = res.data;
        // Konwertujemy tablicę na string
        reset({
          title: data.title,
          description: data.description,
          date: data.date,
          startTime: data.startTime,
          endTime: data.endTime,
          participants: data.participants.join(", "),
          status: data.status
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

  const onSubmit = async (data: EditFormData) => {
    try {
      const updatedMeeting = {
        ...data,
        participants: data.participants
          .split(",")
          .map((email) => email.trim())
          .filter((e) => e),
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
          placeholder="Tytuł"
          {...register("title", { required: "Tytuł jest wymagany" })}
        />
        {errors.title && <p className="error">{errors.title.message}</p>}

        <textarea
          placeholder="Opis"
          {...register("description", { required: "Opis jest wymagany" })}
        />
        {errors.description && <p className="error">{errors.description.message}</p>}

        <input
          type="date"
          {...register("date", {
            required: "Data jest wymagana",
            validate: (v) =>
              v >= new Date().toISOString().slice(0, 10) ||
              "Data musi być dzisiaj lub później",
          })}
        />
        {errors.date && <p className="error">{errors.date.message}</p>}

        <input
          type="time"
          {...register("startTime", { required: "Czas rozpoczęcia jest wymagany" })}
        />
        {errors.startTime && <p className="error">{errors.startTime.message}</p>}

        <input
          type="time"
          {...register("endTime", {
            required: "Czas zakończenia jest wymagany",
            validate: (value, context) =>
              value > context.startTime ||
              "Czas zakończenia musi być po rozpoczęciu",
          })}
        />
        {errors.endTime && <p className="error">{errors.endTime.message}</p>}

        <input
          placeholder="Uczestnicy (emaile, oddzielone przecinkami)"
          {...register("participants", {
            required: "Podaj przynajmniej jeden email",
            pattern: {
              value: /^(\s*\S+@\S+\.\S+\s*)(,\s*\S+@\S+\.\S+\s*)*$/,
              message: "Lista powinna zawierać poprawne adresy email",
            },
          })}
        />
        {errors.participants && <p className="error">{errors.participants.message}</p>}

        <select {...register("status", { required: "Status jest wymagany" })}>
          <option value="scheduled">Zaplanowane</option>
          <option value="canceled">Odwołane</option>
        </select>
        {errors.status && <p className="error">{errors.status.message}</p>}

        <button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Zapis…" : "Zapisz zmiany"}
        </button>
      </form>
    </div>
  );
}
