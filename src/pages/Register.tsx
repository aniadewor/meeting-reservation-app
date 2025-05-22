import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: "onBlur" });
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post("http://localhost:3001/users", {
        ...data,
        role: "user",
        createdAt: new Date().toISOString(),
      });
      alert("✅ Użytkownik został zapisany!");
      navigate("/login");
    } catch (err: any) {
      console.error("❌ Błąd zapisu użytkownika:", err.message || err);
      alert("❌ Błąd – użytkownik nie został zapisany.");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit(onSubmit)} className="register-form">
        <h2>Rejestracja</h2>

        <input
          type="text"
          placeholder="Imię"
          {...register("firstName", { required: "Imię jest wymagane" })}
        />
        {errors.firstName && <p className="error">{errors.firstName.message}</p>}

        <input
          type="text"
          placeholder="Nazwisko"
          {...register("lastName", { required: "Nazwisko jest wymagane" })}
        />
        {errors.lastName && <p className="error">{errors.lastName.message}</p>}

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email jest wymagany",
            pattern: { value: /^\S+@\S+$/i, message: "Nieprawidłowy format email" },
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Hasło"
          {...register("password", {
            required: "Hasło jest wymagane",
            minLength: { value: 6, message: "Hasło musi mieć co najmniej 6 znaków" },
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button type="submit">Zarejestruj się</button>
      </form>
    </div>
  );
}

export default Register;
