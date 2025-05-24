import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({ mode: "onBlur" });
  const navigate = useNavigate();

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/users?email=${data.email}&password=${data.password}`
      );
      const users = res.data;
      if (users.length === 0) {
        alert("❌ Nieprawidłowy email lub hasło");
        return;
      }
      const user = users[0];
      localStorage.setItem("user", JSON.stringify(user));
      alert("✅ Zalogowano pomyślnie!");

      console.log(">>> LOGOWANIE: role =", user.role);

      // przekierowanie w zależności od roli
      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err: any) {
      console.error("❌ Błąd logowania:", err.message || err);
      alert("Błąd logowania.");
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        <h2>Logowanie</h2>

        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email jest wymagany",
            pattern: { value: /^\S+@\S+$/, message: "Nieprawidłowy format email" },
          })}
        />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input
          type="password"
          placeholder="Hasło"
          {...register("password", {
            required: "Hasło jest wymagane",
            minLength: { value: 6, message: "Min. 6 znaków" },
          })}
        />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Ładuję…" : "Zaloguj się"}
        </button>
        <p>
          Nie masz konta?{' '}
          <button
            type="button"
            onClick={() => navigate("/register")}
            className="link-button"
          >
            Zarejestruj się
          </button>
        </p>
      </form>
    </div>
  );
}