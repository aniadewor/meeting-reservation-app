import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddMeeting.css";

interface FormData {
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  participants: string;
}

export default function AddMeeting() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({ mode: "onBlur" });
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const newMeeting = {
        title: data.title,
        description: data.description,
        date: data.date,
        startTime: data.startTime,
        endTime: data.endTime,
        participants: data.participants
          .split(",")
          .map((email) => email.trim()),
        createdBy: user.email,
        status: "scheduled",
        createdAt: new Date().toISOString(),
      };
      await axios.post("http://localhost:3001/meetings", newMeeting);
      alert("✅ Spotkanie zostało dodane!");
      navigate("/");
    } catch (err: any) {
      console.error("❌ Błąd dodawania spotkania:", err.message || err);
      alert("Błąd zapisu spotkania");
    }
  };

  return (
    <div className="add-bg">
      <form className="add-form" onSubmit={handleSubmit(onSubmit)}>
        <h2>Dodaj spotkanie</h2>

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
              v >= new Date().toISOString().slice(0, 10) || "Data musi być dzisiaj lub później",
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
              value > context.startTime || "Czas zakończenia musi być po rozpoczęciu",
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

        <button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Zapis…" : "Zapisz spotkanie"}
        </button>
      </form>
    </div>
  );
}